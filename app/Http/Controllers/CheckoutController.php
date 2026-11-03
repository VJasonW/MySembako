<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    /**
     * Process checkout and create order
     */
    public function store(Request $request)
    {
        $userId = Auth::id();

        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'address_id' => 'required|exists:addresses,id',
            'payment_method' => 'required|string|in:cash,transfer',
            'total_price' => 'required|numeric|min:0',
        ]);

        // Verify address belongs to user
        $address = Address::where('id', $validated['address_id'])
            ->where('user_id', $userId)
            ->first();

        if (!$address) {
            return response()->json(['message' => 'Alamat tidak valid'], 400);
        }

        try {
            $order = DB::transaction(function () use ($userId, $validated) {
                // Create order
                $order = Order::create([
                    'buyer_id' => $userId,
                    'total_price' => $validated['total_price'],
                    'status' => 'pending',
                    'payment_method' => $validated['payment_method'],
                ]);

                // Create order items and validate stock
                foreach ($validated['items'] as $item) {
                    $product = Product::lockForUpdate()->findOrFail($item['product_id']);

                    if ($product->stock < $item['quantity']) {
                        throw new \RuntimeException(
                            "Stok tidak mencukupi untuk produk: {$product->name}. Stok tersedia: {$product->stock}"
                        );
                    }

                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $item['product_id'],
                        'quantity' => $item['quantity'],
                        'price' => $item['price'],
                    ]);

                    $product->decrement('stock', $item['quantity']);
                }

                // Remove items from cart
                $productIds = collect($validated['items'])->pluck('product_id');
                Cart::where('user_id', $userId)
                    ->whereIn('product_id', $productIds)
                    ->delete();

                return $order;
            });

            return response()->json([
                'message' => 'Pesanan berhasil dibuat',
                'order_id' => $order->id,
            ], 201);

        } catch (\RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat membuat pesanan',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

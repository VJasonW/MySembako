<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * API: Get all orders for the authenticated buyer
     */
    public function apiIndex()
    {
        $orders = Auth::user()->orders()
            ->with(['items.product'])
            ->latest()
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'status' => $order->status,
                    'total_price' => $order->total_price,
                    'payment_method' => $order->payment_method,
                    'created_at' => $order->created_at->format('d F Y'),
                    'created_at_iso' => $order->created_at->toIso8601String(),
                    'date' => $order->created_at->format('Y-m-d'),
                    'items' => $order->items->map(function ($item) {
                        return [
                            'product_name' => $item->product->name ?? 'Produk dihapus',
                            'quantity' => $item->quantity,
                            'price' => $item->price,
                        ];
                    }),
                ];
            });

        return response()->json($orders);
    }

    /**
     * Cancel order (only for pending orders)
     */
    public function cancel(Order $order)
    {
        if ($order->buyer_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($order->status !== 'pending') {
            return response()->json([
                'message' => 'Hanya pesanan dengan status pending yang dapat dibatalkan'
            ], 400);
        }

        try {
            DB::transaction(function () use ($order) {
                foreach ($order->items as $item) {
                    Product::where('id', $item->product_id)->increment('stock', $item->quantity);
                }
                $order->update(['status' => 'cancel']);
            });

            return response()->json([
                'message' => 'Pesanan berhasil dibatalkan',
                'order' => $order->fresh(['items.product']),
            ], 200);

        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat membatalkan pesanan',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mark order as completed (only allowed for shipped orders by the buyer)
     */
    public function complete(Order $order)
    {
        if ($order->buyer_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($order->status !== 'shipped') {
            return response()->json([
                'message' => 'Hanya pesanan dengan status dikirim yang dapat diselesaikan'
            ], 400);
        }

        try {
            $order->update(['status' => 'done']);

            return response()->json([
                'message' => 'Pesanan ditandai selesai',
                'order' => $order->fresh(['items.product']),
            ], 200);

        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat menyelesaikan pesanan',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

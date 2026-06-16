const STORAGE_KEY = 'palmsys_offline_transactions';

// Simpan transaksi ke localStorage
export function saveOffline(transaction) {
    const existing = getOfflineTransactions();
    existing.push({
        ...transaction,
        status_sync: 'pending',
        offline_id: Date.now(),
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

// Ambil semua transaksi offline
export function getOfflineTransactions() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Hapus semua transaksi offline setelah sync
export function clearOfflineTransactions() {
    localStorage.removeItem(STORAGE_KEY);
}

// Cek apakah online
export function isOnline() {
    return navigator.onLine;
}

// Sync ke server
export async function syncToServer(csrfToken) {
    const transactions = getOfflineTransactions();

    if (transactions.length === 0) {
        return { synced: 0, message: 'Tidak ada data offline.' };
    }

    try {
        const response = await fetch('/sync/offline', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify({ transactions }),
        });

        const result = await response.json();

        if (result.success) {
            clearOfflineTransactions();
        }

        return result;
    } catch (error) {
        return { success: false, message: 'Gagal sync: ' + error.message };
    }
}
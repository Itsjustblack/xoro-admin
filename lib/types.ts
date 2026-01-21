export interface ChatItem {
	id: string;
	name: string;
	avatar: string;
	lastMessage: string;
	timeAway: string;
	unread: number;
}

export interface Message {
	id: string;
	content: string;
	timestamp: string;
	isAgent: boolean;
}

export interface CustomerData {
	id: string;
	name: string;
	avatar: string;
	email: string;
	phone: string;
	joinDate: string;
	totalOrders: number;
	totalSpent: string;
	lastPurchase: string;
	status: "active" | "inactive" | "pending";
}

export interface Product {
	id: string;
	name: string;
	image?: string;
	price: string;
	stock: number;
	category: string;
	description: string;
	sku: string;
}

export interface OrderItem {
	productId: string;
	productName: string;
	quantity: number;
	price: string;
}

export interface Order {
	id: string;
	orderNumber: string;
	customerName: string;
	customerEmail: string;
	items: OrderItem[];
	totalAmount: string;
	status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
	paymentStatus: "paid" | "unpaid" | "refunded";
	orderDate: string;
	shippingAddress: string;
}

export interface Notification {
	id: string;
	title: string;
	description: string;
	timestamp: string;
	read: boolean;
	type: "info" | "warning" | "success" | "order";
}

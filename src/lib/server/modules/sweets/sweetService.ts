import { SweetDAO } from '.';
import type { Sweet } from './sweetType';

export class SweetService {
	static async createSweet(uid: string, text: string, mediaUrls?: string[]): Promise<Sweet> {
		return SweetDAO.createSweet(uid, text, mediaUrls);
	}

	static async getSweetById(sweetId: string): Promise<Sweet | null> {
		return SweetDAO.getSweetById(sweetId);
	}

	static async updateSweet(
		sweetId: string,
		newText: string,
		newMediaUrls: string[]
	): Promise<Sweet> {
		return SweetDAO.updateSweet(sweetId, newText, newMediaUrls);
	}

	static async deleteSweet(sweetId: string): Promise<void> {
		await SweetDAO.deleteSweet(sweetId);
	}

	static async getAllSweets(): Promise<Sweet[]> {
		return SweetDAO.getAllSweets();
	}
}

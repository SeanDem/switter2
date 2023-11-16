import { SweetDao, type Sweet } from '.';
import type { Interaction } from '../interactions';

export class SweetService {
	static async createSweet(uid: string, text: string, mediaUrls?: string[]): Promise<Sweet> {
		return SweetDao.createSweet(uid, text, mediaUrls);
	}

	static async getSweetById(sweetId: string): Promise<Sweet | null> {
		return SweetDao.getSweetById(sweetId);
	}
	static async getSweetsByUid(uid: string): Promise<Sweet[] | null> {
		return SweetDao.getSweetsByUid(uid);
	}

	static async updateSweet(
		sweetId: string,
		newText: string,
		newMediaUrls: string[]
	): Promise<Sweet> {
		return SweetDao.updateSweet(sweetId, newText, newMediaUrls);
	}

	static async deleteSweet(sweetId: string): Promise<void> {
		await SweetDao.deleteSweet(sweetId);
	}

	static async getAllSweets(): Promise<Sweet[]> {
		return SweetDao.getAllSweets();
	}

	static async getAllSweetDetails(): Promise<Interaction[]> {
		return SweetDao.getSweetDetails();
	}

	static async getSweetDetailsById(sweetId: string): Promise<any> {
		return SweetDao.getActionbyId({ _sweet_id: sweetId });
	}
}
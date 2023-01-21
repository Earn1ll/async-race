import { CarItem } from "./types";

export default class ARApi {
    apiBase = 'http://127.0.0.1:3000';
  
    async getResource(url: string) {
      const res = await fetch(`${this.apiBase}${url}`);
  
      if (!res.ok) {
        throw new Error(`\n URL ошибки: ${url} \n Статус ошибки: ${res.status}`);
      }
  
      return await res.json();
    }

    async getCars() {
      return await this.getResource(`/garage`);
    }
  
    async getCar(id: number) {
      return await this.getResource(`/garage/${id}`);
    }
  
    async createCar(car: CarItem) {
      await fetch(`${this.apiBase}/garage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
      });
    }

    async deleteCar(id: number) {
      await fetch(`${this.apiBase}/garage/${id}`, {
        method: 'DELETE',
      });
    }
  
    async updateCar(id: number, car: CarItem) {
      await fetch(`${this.apiBase}/garage/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
      });
    }
  
    async getWinners() {
      return await this.getResource(`/winners`);
    }
  }
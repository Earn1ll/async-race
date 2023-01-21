export default class ARApi {
    apiBase = 'http://127.0.0.1:3000';
  
    async getResource(url: string) {
      const res = await fetch(`${this.apiBase}${url}`);
  
      if (!res.ok) {
        throw new Error(`\n URL ошибки: ${url} \n Статус ошибки: ${res.status}`);
      }
  
      return await res.json();
    }
  }
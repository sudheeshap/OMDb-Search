export class FirebaseServiceMock {
  store = {};
  db = {
    list: (path: string) => {
      return {
        push: () => ({ key: `${Math.round(Math.random() * 100)}`}),
        set: (key: string, value: any) => {
          this.store[key] = value;
        }
      };
    }
  };

  getDatabase() {
    return this.db;
  }

  setValue(path: string, key: string, value: any): void {
    this.db.list(path).set(key, value);
  }
}
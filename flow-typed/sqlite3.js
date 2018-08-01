declare module "sqlite3" {
  declare class Database {
    constructor(urlStr: string): Database;
  };

  // Declares a default export whose type is `typeof URL`
  declare module.exports: {
    Database
  };
}

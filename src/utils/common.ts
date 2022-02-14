import Logger from '../middlewares/logger';
import Client from '../../config/database';

class Common {
  static async dbFetch(table: string, conditions: any = null, selections: any = null) {
    try {
      let query, replacements;
      const select = selections ? `${selections.join(', ')}` : '*';

      if (conditions) {
        query = `
          SELECT ${select} FROM ${table}
          WHERE ${Object.keys(conditions)
            .map((k, i) => `${k} = \$${i + 1}`)
            .join(' AND ')};
        `;
        replacements = [...Object.values(conditions)];
      } else {
        query = `SELECT ${select} FROM ${table};`;
        replacements = undefined;
      }
      const cn = await Client.connect();
      const { rows } = await cn.query(query, replacements);
      cn.release();

      return Array.from(rows);
    } catch (err) {
      Logger.error('DB ERROR: ', err);
    }
  }
  static async dbInsert(table: string, obj: any) {
    try {
      const cn = await Client.connect();
      const { rows } = await cn.query(
        `
          INSERT INTO ${table} (${Object.keys(obj)
          .map((k) => k)
          .join(', ')})
          VALUES (${Object.values(obj)
            .map((k) => `'${k}'`)
            .join(', ')}) RETURNING *;
        `,
      );
      cn.release();
      return Array.from(rows);
    } catch (error) {
      Logger.error('DB ERROR: ', error);
    }
  }

  // Truncate all the tables in the database whiche means delete the data inside tables not the table itself.
  static async dbTruncate() {
    try {
      const cn = await Client.connect();

      const { rows } = await cn.query("SELECT * FROM information_schema.tables WHERE table_schema = 'public';");
      // console.log(tables);
      const tablesNames = rows.map((t: any) => t.table_name).filter((tableName: string) => tableName !== 'migrations');

      let finalQuery = '';

      tablesNames.forEach((tableName: string) => {
        finalQuery += `TRUNCATE TABLE ${tableName} CASCADE; `;
      });

      return await cn.query(finalQuery);
    } catch (err) {
      Logger.error('SEQUELIZE ERROR: ', err);
    }
  }
}
export default Common;

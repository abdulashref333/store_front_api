import Logger from '../middlewares/logger';
import Client from '../../config/database';

class Common {
  static async dbFetch(table: string, conditions: any = null, selections: any = null) {
    try {
      let query, replacements;
      const select = selections ? `${selections.join(', ')}` : '*';

      // console.log({ select });
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

      // console.log({ query, replacements });

      const cn = await Client.connect();
      const { rows } = await cn.query(query, replacements);

      // console.log({ rows });
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
  // Any is used here because we can't determine the object structure ahead
  // as this is used for inserting different models
  static async dbInsertMany(table: string, obj: any[]) {
    try {
      const cn = await Client.connect();
      const { rows } = await cn.query(
        `
          INSERT INTO ${table} (${Object.keys(obj[0])
          .map((k) => k)
          .join(', ')})
          VALUES ${obj.map((object) => {
            return `(${Object.values(object)
              .map((k) => `'${k}'`)
              .join(', ')})`;
          })} RETURNING *;
        `,
      );
      cn.release();
      return Array.from(rows);
    } catch (error) {
      Logger.error('DB ERROR: ', error);
    }
  }
  // Any is used here because we can't determine the object structure ahead
  // as this is used for updating different models
  static async dbUpdate(table: string, conditions: any, data: any) {
    try {
      const cn = await Client.connect();
      const dataLength = Object.keys(data).length;
      const query = `
                  UPDATE ${table} SET ${Object.keys(data).map((k, i) => `${k} = \$${i + 1}`)}
                  WHERE ${Object.keys(conditions)
                    .map((k, i) => `${k} = \$${dataLength + i + 1}`)
                    .join(' AND ')} RETURNING *;
                `;
      const { rows } = await cn.query(query, [...Object.values(data), ...Object.values(conditions)]);

      cn.release();

      return Array.from(rows);
    } catch (err) {
      Logger.error('DB ERROR: ', err);
    }
  }

  // Any is used here because we can't determine the object structure ahead
  // as this is used for the deletion of different models
  static async dbDeletion(table: string, conditions: any): Promise<boolean | undefined> {
    try {
      const cn = await Client.connect();

      const { rows } = await cn.query(
        `
          DELETE FROM ${table}
          WHERE ${Object.keys(conditions)
            .map((k, i) => `${k} = \$${i + 1}`)
            .join(' AND ')} RETURNING *;
        `,
        [...Object.values(conditions)],
      );
      cn.release();
      return rows.length > 0;
    } catch (err) {
      Logger.error('DB ERROR: ', err);
    }
  }

  // Truncate all the tables in the database
  //Truncate means delete the data inside tables not the table itself.
  static async dbTruncate(table_name?: string) {
    try {
      const cn = await Client.connect();
      if (!table_name) {
        const { rows } = await cn.query("SELECT * FROM information_schema.tables WHERE table_schema = 'public';");
        // console.log('i am here');
        const tablesNames = rows
          .map((t: any) => t.table_name)
          .filter((tableName: string) => tableName !== 'migrations');

        let finalQuery = '';

        tablesNames.forEach((tableName: string) => {
          finalQuery += `TRUNCATE TABLE ${tableName} CASCADE; `;
        });

        return await cn.query(finalQuery);
      } else {
        return await cn.query(`TRUNCATE TABLE ${table_name} CASCADE;`);
      }
    } catch (err) {
      Logger.error('SEQUELIZE ERROR: ', err);
    }
  }
}
export default Common;

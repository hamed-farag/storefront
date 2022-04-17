import logger from "../helpers/logger";
import { DatabaseError } from "pg";

interface ErrorCodeInterface {
    [code: string]: string;
}

export const parseError = (err: DatabaseError) => {
    const errorCodes: ErrorCodeInterface = {
        "08003": "connection_does_not_exist",
        "08006": "connection_failure",
        "2F002": "modifying_sql_data_not_permitted",
        "42000": "syntax_error_or_access_rule_violation",
        "42501": "insufficient_privilege",
        "42601": "syntax_error",
        "42602": "invalid_name",
        "42622": "name_too_long",
        "42703": "undefined_column",
        "42939": "reserved_name",
        "42P01": "undefined_table",
        "42P02": "undefined_parameter",
        "57P03": "cannot_connect_now",
    };

    if (err !== undefined) {
        if (err.message !== undefined) {
            logger.error("Error Message", err.message);
        }

        if (err.code !== undefined) {
            logger.error("Postgres Error's Code", err.code);

            if (errorCodes[err.code] !== undefined) {
                logger.error("Postgres Error's Code", errorCodes[err.code]);
            }
        }

        if (err.code === undefined) {
            logger.error("Unknown Error", err);
        }
    }
};

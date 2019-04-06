import * as validator from 'validator';
import { createRule } from "react-use-validator";
import i18n from "../../i18n";

export const isUrl = createRule("url", value => validator.isURL(value), i18n.t("url_invalid"));
export const required = createRule("required", value => !validator.isEmpty(value), i18n.t("field_required"));
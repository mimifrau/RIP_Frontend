/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Tax {
  /** ID */
  id?: number;
  /** Owner */
  owner?: string;
  /** Moderator */
  moderator?: string;
  /** Codes */
  codes?: string;
  /** Статус */
  status?: 1 | 2 | 3 | 4 | 5;
  /**
   * Дата создания
   * @format date-time
   */
  date_created?: string | null;
  /**
   * Дата формирования
   * @format date-time
   */
  date_formation?: string | null;
  /**
   * Дата завершения
   * @format date-time
   */
  date_complete?: string | null;
  /** Field */
  field?: string | null;
  /**
   * Summ
   * @min -2147483648
   * @max 2147483647
   */
  summ?: number | null;
}

export interface CodeTax {
  /** ID */
  id?: number;
  /**
   * Paid
   * @min -2147483648
   * @max 2147483647
   */
  paid?: number;
  /** Code */
  code?: number | null;
  /** Tax */
  tax?: number | null;
}

export interface UpdateTaxStatusAdmin {
  /** Status */
  status: number;
}

export interface CodeAdd {
  /**
   * ФИО
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Описание
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /**
   * Расшифровка
   * @min -2147483648
   * @max 2147483647
   */
  decryption: number;
  /**
   * Фото
   * @format uri
   */
  image?: string | null;
}

export interface Code {
  /** ID */
  id?: number;
  /** Image */
  image?: string;
  /**
   * ФИО
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Описание
   * @minLength 1
   * @maxLength 500
   */
  description: string;
  /** Статус */
  status?: 1 | 2;
  /**
   * Расшифровка
   * @min -2147483648
   * @max 2147483647
   */
  decryption: number;
}

export interface UserLogin {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface UserRegister {
  /** ID */
  id?: number;
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
}

export interface UserProfile {
  /**
   * Username
   * @minLength 1
   */
  username?: string;
  /**
   * Email
   * @minLength 1
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   */
  password?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000/api
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  taxs = {
    /**
     * No description
     *
     * @tags taxs
     * @name TaxsList
     * @request GET:/taxs/
     * @secure
     */
    taxsList: (
      query?: {
        status?: number;
        date_formation_start?: string;
        date_formation_end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/taxs/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags taxs
     * @name TaxsRead
     * @request GET:/taxs/{tax_id}/
     * @secure
     */
    taxsRead: (taxId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/taxs/${taxId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags taxs
     * @name TaxsDeleteDelete
     * @request DELETE:/taxs/{tax_id}/delete/
     * @secure
     */
    taxsDeleteDelete: (taxId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/taxs/${taxId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags taxs
     * @name TaxsDeleteCodeDelete
     * @request DELETE:/taxs/{tax_id}/delete_code/{code_id}/
     * @secure
     */
    taxsDeleteCodeDelete: (taxId: string, codeId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/taxs/${taxId}/delete_code/${codeId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags taxs
     * @name TaxsUpdateUpdate
     * @request PUT:/taxs/{tax_id}/update/
     * @secure
     */
    taxsUpdateUpdate: (taxId: string, data: Tax, params: RequestParams = {}) =>
      this.request<Tax, any>({
        path: `/taxs/${taxId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags taxs
     * @name TaxsUpdateCodeUpdate
     * @request PUT:/taxs/{tax_id}/update_code/{code_id}/
     * @secure
     */
    taxsUpdateCodeUpdate: (
      taxId: string,
      codeId: string,
      data: CodeTax,
      params: RequestParams = {},
    ) =>
      this.request<CodeTax, any>({
        path: `/taxs/${taxId}/update_code/${codeId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags taxs
     * @name TaxsUpdateStatusAdminUpdate
     * @request PUT:/taxs/{tax_id}/update_status_admin/
     * @secure
     */
    taxsUpdateStatusAdminUpdate: (
      taxId: string,
      data: UpdateTaxStatusAdmin,
      params: RequestParams = {},
    ) =>
      this.request<UpdateTaxStatusAdmin, any>({
        path: `/taxs/${taxId}/update_status_admin/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags taxs
     * @name TaxsUpdateStatusUserUpdate
     * @request PUT:/taxs/{tax_id}/update_status_user/
     * @secure
     */
    taxsUpdateStatusUserUpdate: (taxId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/taxs/${taxId}/update_status_user/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  codes = {
    /**
     * No description
     *
     * @tags codes
     * @name CodesList
     * @request GET:/codes/
     * @secure
     */
    codesList: (
      query?: {
        code_name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/codes/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags codes
     * @name CodesCreateCreate
     * @request POST:/codes/create/
     * @secure
     */
    codesCreateCreate: (
      data: {
        /**
         * @minLength 1
         * @maxLength 100
         */
        name: string;
        /**
         * @minLength 1
         * @maxLength 500
         */
        description: string;
        /**
         * @min -2147483648
         * @max 2147483647
         */
        decryption: number;
        /** @format binary */
        image?: File | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<CodeAdd, any>({
        path: `/codes/create/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags codes
     * @name CodesRead
     * @request GET:/codes/{code_id}/
     * @secure
     */
    codesRead: (codeId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/codes/${codeId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags codes
     * @name CodesAddToTaxCreate
     * @request POST:/codes/{code_id}/add_to_tax/
     * @secure
     */
    codesAddToTaxCreate: (codeId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/codes/${codeId}/add_to_tax/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags codes
     * @name CodesDeleteDelete
     * @request DELETE:/codes/{code_id}/delete/
     * @secure
     */
    codesDeleteDelete: (codeId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/codes/${codeId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags codes
     * @name CodesUpdateUpdate
     * @request PUT:/codes/{code_id}/update/
     * @secure
     */
    codesUpdateUpdate: (codeId: string, data: Code, params: RequestParams = {}) =>
      this.request<Code, any>({
        path: `/codes/${codeId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags codes
     * @name CodesUpdateImageCreate
     * @request POST:/codes/{code_id}/update_image/
     * @secure
     */
    codesUpdateImageCreate: (
      codeId: string,
      data: {
        /** @format binary */
        image?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/codes/${codeId}/update_image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersLoginCreate
     * @request POST:/users/login/
     * @secure
     */
    usersLoginCreate: (data: UserLogin, params: RequestParams = {}) =>
      this.request<UserLogin, any>({
        path: `/users/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersLogoutCreate
     * @request POST:/users/logout/
     * @secure
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: UserRegister, params: RequestParams = {}) =>
      this.request<UserRegister, any>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdateUpdate
     * @request PUT:/users/{user_id}/update/
     * @secure
     */
    usersUpdateUpdate: (userId: string, data: UserProfile, params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/users/${userId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}

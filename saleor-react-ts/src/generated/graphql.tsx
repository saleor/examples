import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * Allows use of a JSON String for input / output from the GraphQL schema.
   *
   * Use of this type is *not recommended* as you lose the benefits of having a defined, static
   * schema (one of the key benefits of GraphQL).
   */
  JSONString: any;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  UUID: any;
  /** Anything */
  _Any: any;
  /**
   * Positive Decimal scalar implementation.
   *
   * Should be used in places where value must be positive.
   */
  PositiveDecimal: any;
  WeightScalar: any;
  /** Variables of this type must be set to null in mutations. They will be replaced with a filename from a following multipart part containing a binary file. See: https://github.com/jaydenseric/graphql-multipart-request-spec. */
  Upload: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
};

export type Query = {
  __typename?: 'Query';
  /** Look up a webhook by ID. */
  webhook?: Maybe<Webhook>;
  /**
   * List of webhooks.
   * @deprecated Use webhooks field on app(s) query instead. This field will be removed after 2020-07-31.
   */
  webhooks?: Maybe<WebhookCountableConnection>;
  /** List of all available webhook events. */
  webhookEvents?: Maybe<Array<Maybe<WebhookEvent>>>;
  /** Retrieve a sample payload for a given webhook event based on real data. It can be useful for some integrations where sample payload is required. */
  webhookSamplePayload?: Maybe<Scalars['JSONString']>;
  /** Look up a warehouse by ID. */
  warehouse?: Maybe<Warehouse>;
  /** List of warehouses. */
  warehouses?: Maybe<WarehouseCountableConnection>;
  /** Returns a list of all translatable items of a given kind. */
  translations?: Maybe<TranslatableItemConnection>;
  translation?: Maybe<TranslatableItem>;
  /** Look up a stock by ID */
  stock?: Maybe<Stock>;
  /** List of stocks. */
  stocks?: Maybe<StockCountableConnection>;
  /** Return information about the shop. */
  shop: Shop;
  /** Look up a shipping zone by ID. */
  shippingZone?: Maybe<ShippingZone>;
  /** List of the shop's shipping zones. */
  shippingZones?: Maybe<ShippingZoneCountableConnection>;
  /** Look up digital content by ID. */
  digitalContent?: Maybe<DigitalContent>;
  /** List of digital content. */
  digitalContents?: Maybe<DigitalContentCountableConnection>;
  /** List of the shop's attributes. */
  attributes?: Maybe<AttributeCountableConnection>;
  /** Look up an attribute by ID. */
  attribute?: Maybe<Attribute>;
  /** List of the shop's categories. */
  categories?: Maybe<CategoryCountableConnection>;
  /** Look up a category by ID or slug. */
  category?: Maybe<Category>;
  /** Look up a collection by ID. */
  collection?: Maybe<Collection>;
  /** List of the shop's collections. */
  collections?: Maybe<CollectionCountableConnection>;
  /** Look up a product by ID. */
  product?: Maybe<Product>;
  /** List of the shop's products. */
  products?: Maybe<ProductCountableConnection>;
  /** Look up a product type by ID. */
  productType?: Maybe<ProductType>;
  /** List of the shop's product types. */
  productTypes?: Maybe<ProductTypeCountableConnection>;
  /** Look up a product variant by ID or SKU. */
  productVariant?: Maybe<ProductVariant>;
  /** List of product variants. */
  productVariants?: Maybe<ProductVariantCountableConnection>;
  /** List of top selling products. */
  reportProductSales?: Maybe<ProductVariantCountableConnection>;
  /** Look up a payment by ID. */
  payment?: Maybe<Payment>;
  /** List of payments. */
  payments?: Maybe<PaymentCountableConnection>;
  /** Look up a page by ID or slug. */
  page?: Maybe<Page>;
  /** List of the shop's pages. */
  pages?: Maybe<PageCountableConnection>;
  /** List of activity events to display on homepage (at the moment it only contains order-events). */
  homepageEvents?: Maybe<OrderEventCountableConnection>;
  /** Look up an order by ID. */
  order?: Maybe<Order>;
  /** List of orders. */
  orders?: Maybe<OrderCountableConnection>;
  /** List of draft orders. */
  draftOrders?: Maybe<OrderCountableConnection>;
  /** Return the total sales amount from a specific period. */
  ordersTotal?: Maybe<TaxedMoney>;
  /** Look up an order by token. */
  orderByToken?: Maybe<Order>;
  /** Look up a navigation menu by ID or name. */
  menu?: Maybe<Menu>;
  /** List of the storefront's menus. */
  menus?: Maybe<MenuCountableConnection>;
  /** Look up a menu item by ID. */
  menuItem?: Maybe<MenuItem>;
  /** List of the storefronts's menu items. */
  menuItems?: Maybe<MenuItemCountableConnection>;
  /** Look up a gift card by ID. */
  giftCard?: Maybe<GiftCard>;
  /** List of gift cards. */
  giftCards?: Maybe<GiftCardCountableConnection>;
  /** Look up a plugin by ID. */
  plugin?: Maybe<Plugin>;
  /** List of plugins. */
  plugins?: Maybe<PluginCountableConnection>;
  /** Look up a sale by ID. */
  sale?: Maybe<Sale>;
  /** List of the shop's sales. */
  sales?: Maybe<SaleCountableConnection>;
  /** Look up a voucher by ID. */
  voucher?: Maybe<Voucher>;
  /** List of the shop's vouchers. */
  vouchers?: Maybe<VoucherCountableConnection>;
  /** Look up a export file by ID. */
  exportFile?: Maybe<ExportFile>;
  /** List of export files. */
  exportFiles?: Maybe<ExportFileCountableConnection>;
  /** List of all tax rates available from tax gateway. */
  taxTypes?: Maybe<Array<Maybe<TaxType>>>;
  /** Look up a checkout by token. */
  checkout?: Maybe<Checkout>;
  /** List of checkouts. */
  checkouts?: Maybe<CheckoutCountableConnection>;
  /** Look up a checkout line by ID. */
  checkoutLine?: Maybe<CheckoutLine>;
  /** List of checkout lines. */
  checkoutLines?: Maybe<CheckoutLineCountableConnection>;
  /** List of all apps installations */
  appsInstallations: Array<AppInstallation>;
  /** List of the apps. */
  apps?: Maybe<AppCountableConnection>;
  /** Look up a app by ID. */
  app?: Maybe<App>;
  /** Returns address validation rules. */
  addressValidationRules?: Maybe<AddressValidationData>;
  /** Look up an address by ID. */
  address?: Maybe<Address>;
  /** List of the shop's customers. */
  customers?: Maybe<UserCountableConnection>;
  /** List of permission groups. */
  permissionGroups?: Maybe<GroupCountableConnection>;
  /** Look up permission group by ID. */
  permissionGroup?: Maybe<Group>;
  /** Return the currently authenticated user. */
  me?: Maybe<User>;
  /** List of the shop's staff users. */
  staffUsers?: Maybe<UserCountableConnection>;
  /**
   * List of the service accounts.
   * @deprecated Use the `apps` query instead. This field will be removed after 2020-07-31.
   */
  serviceAccounts?: Maybe<ServiceAccountCountableConnection>;
  /**
   * Look up a service account by ID.
   * @deprecated Use the `app` query instead. This field will be removed after 2020-07-31.
   */
  serviceAccount?: Maybe<ServiceAccount>;
  /** Look up a user by ID. */
  user?: Maybe<User>;
  _entities?: Maybe<Array<Maybe<_Entity>>>;
  _service?: Maybe<_Service>;
};


export type QueryWebhookArgs = {
  id: Scalars['ID'];
};


export type QueryWebhooksArgs = {
  sortBy?: Maybe<WebhookSortingInput>;
  filter?: Maybe<WebhookFilterInput>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryWebhookSamplePayloadArgs = {
  eventType: WebhookSampleEventTypeEnum;
};


export type QueryWarehouseArgs = {
  id: Scalars['ID'];
};


export type QueryWarehousesArgs = {
  filter?: Maybe<WarehouseFilterInput>;
  sortBy?: Maybe<WarehouseSortingInput>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryTranslationsArgs = {
  kind: TranslatableKinds;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryTranslationArgs = {
  id: Scalars['ID'];
  kind: TranslatableKinds;
};


export type QueryStockArgs = {
  id: Scalars['ID'];
};


export type QueryStocksArgs = {
  filter?: Maybe<StockFilterInput>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryShippingZoneArgs = {
  id: Scalars['ID'];
};


export type QueryShippingZonesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryDigitalContentArgs = {
  id: Scalars['ID'];
};


export type QueryDigitalContentsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryAttributesArgs = {
  filter?: Maybe<AttributeFilterInput>;
  sortBy?: Maybe<AttributeSortingInput>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryAttributeArgs = {
  id: Scalars['ID'];
};


export type QueryCategoriesArgs = {
  filter?: Maybe<CategoryFilterInput>;
  sortBy?: Maybe<CategorySortingInput>;
  level?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryCategoryArgs = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
};


export type QueryCollectionArgs = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
};


export type QueryCollectionsArgs = {
  filter?: Maybe<CollectionFilterInput>;
  sortBy?: Maybe<CollectionSortingInput>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryProductArgs = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
};


export type QueryProductsArgs = {
  filter?: Maybe<ProductFilterInput>;
  sortBy?: Maybe<ProductOrder>;
  stockAvailability?: Maybe<StockAvailability>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryProductTypeArgs = {
  id: Scalars['ID'];
};


export type QueryProductTypesArgs = {
  filter?: Maybe<ProductTypeFilterInput>;
  sortBy?: Maybe<ProductTypeSortingInput>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryProductVariantArgs = {
  id?: Maybe<Scalars['ID']>;
  sku?: Maybe<Scalars['String']>;
};


export type QueryProductVariantsArgs = {
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>;
  filter?: Maybe<ProductVariantFilterInput>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryReportProductSalesArgs = {
  period: ReportingPeriod;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryPaymentArgs = {
  id: Scalars['ID'];
};


export type QueryPaymentsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryPageArgs = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
};


export type QueryPagesArgs = {
  sortBy?: Maybe<PageSortingInput>;
  filter?: Maybe<PageFilterInput>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryHomepageEventsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryOrderArgs = {
  id: Scalars['ID'];
};


export type QueryOrdersArgs = {
  sortBy?: Maybe<OrderSortingInput>;
  filter?: Maybe<OrderFilterInput>;
  created?: Maybe<ReportingPeriod>;
  status?: Maybe<OrderStatusFilter>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryDraftOrdersArgs = {
  sortBy?: Maybe<OrderSortingInput>;
  filter?: Maybe<OrderDraftFilterInput>;
  created?: Maybe<ReportingPeriod>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryOrdersTotalArgs = {
  period?: Maybe<ReportingPeriod>;
};


export type QueryOrderByTokenArgs = {
  token: Scalars['UUID'];
};


export type QueryMenuArgs = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};


export type QueryMenusArgs = {
  sortBy?: Maybe<MenuSortingInput>;
  filter?: Maybe<MenuFilterInput>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryMenuItemArgs = {
  id: Scalars['ID'];
};


export type QueryMenuItemsArgs = {
  sortBy?: Maybe<MenuItemSortingInput>;
  filter?: Maybe<MenuItemFilterInput>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryGiftCardArgs = {
  id: Scalars['ID'];
};


export type QueryGiftCardsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryPluginArgs = {
  id: Scalars['ID'];
};


export type QueryPluginsArgs = {
  filter?: Maybe<PluginFilterInput>;
  sortBy?: Maybe<PluginSortingInput>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QuerySaleArgs = {
  id: Scalars['ID'];
};


export type QuerySalesArgs = {
  filter?: Maybe<SaleFilterInput>;
  sortBy?: Maybe<SaleSortingInput>;
  query?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryVoucherArgs = {
  id: Scalars['ID'];
};


export type QueryVouchersArgs = {
  filter?: Maybe<VoucherFilterInput>;
  sortBy?: Maybe<VoucherSortingInput>;
  query?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryExportFileArgs = {
  id: Scalars['ID'];
};


export type QueryExportFilesArgs = {
  filter?: Maybe<ExportFileFilterInput>;
  sortBy?: Maybe<ExportFileSortingInput>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryCheckoutArgs = {
  token?: Maybe<Scalars['UUID']>;
};


export type QueryCheckoutsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryCheckoutLineArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryCheckoutLinesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryAppsArgs = {
  filter?: Maybe<AppFilterInput>;
  sortBy?: Maybe<AppSortingInput>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryAppArgs = {
  id: Scalars['ID'];
};


export type QueryAddressValidationRulesArgs = {
  countryCode: CountryCode;
  countryArea?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  cityArea?: Maybe<Scalars['String']>;
};


export type QueryAddressArgs = {
  id: Scalars['ID'];
};


export type QueryCustomersArgs = {
  filter?: Maybe<CustomerFilterInput>;
  sortBy?: Maybe<UserSortingInput>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryPermissionGroupsArgs = {
  filter?: Maybe<PermissionGroupFilterInput>;
  sortBy?: Maybe<PermissionGroupSortingInput>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryPermissionGroupArgs = {
  id: Scalars['ID'];
};


export type QueryStaffUsersArgs = {
  filter?: Maybe<StaffUserInput>;
  sortBy?: Maybe<UserSortingInput>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryServiceAccountsArgs = {
  filter?: Maybe<ServiceAccountFilterInput>;
  sortBy?: Maybe<ServiceAccountSortingInput>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryServiceAccountArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type Query_EntitiesArgs = {
  representations?: Maybe<Array<Maybe<Scalars['_Any']>>>;
};

/** Webhook. */
export type Webhook = Node & {
  __typename?: 'Webhook';
  name: Scalars['String'];
  targetUrl: Scalars['String'];
  isActive: Scalars['Boolean'];
  secretKey?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** List of webhook events. */
  events: Array<WebhookEvent>;
  /** @deprecated Use the `app` field instead. This field will be removed after 2020-07-31. */
  serviceAccount: ServiceAccount;
  app: App;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

/** Webhook event. */
export type WebhookEvent = {
  __typename?: 'WebhookEvent';
  /** Internal name of the event type. */
  eventType: WebhookEventTypeEnum;
  /** Display name of the event. */
  name: Scalars['String'];
};

/** An enumeration. */
export enum WebhookEventTypeEnum {
  AnyEvents = 'ANY_EVENTS',
  OrderCreated = 'ORDER_CREATED',
  OrderFullyPaid = 'ORDER_FULLY_PAID',
  OrderUpdated = 'ORDER_UPDATED',
  OrderCancelled = 'ORDER_CANCELLED',
  OrderFulfilled = 'ORDER_FULFILLED',
  InvoiceRequested = 'INVOICE_REQUESTED',
  InvoiceDeleted = 'INVOICE_DELETED',
  InvoiceSent = 'INVOICE_SENT',
  CustomerCreated = 'CUSTOMER_CREATED',
  ProductCreated = 'PRODUCT_CREATED',
  ProductUpdated = 'PRODUCT_UPDATED',
  CheckoutQuantityChanged = 'CHECKOUT_QUANTITY_CHANGED',
  CheckoutCreated = 'CHECKOUT_CREATED',
  CheckoutUpdated = 'CHECKOUT_UPDATED',
  FulfillmentCreated = 'FULFILLMENT_CREATED'
}

/** Represents service account data. */
export type ServiceAccount = Node & ObjectWithMetadata & {
  __typename?: 'ServiceAccount';
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Name of the service account. */
  name?: Maybe<Scalars['String']>;
  /** The date and time when the service account was created. */
  created?: Maybe<Scalars['DateTime']>;
  /** Determine if service account will be set active or not. */
  isActive?: Maybe<Scalars['Boolean']>;
  /** List of the service's permissions. */
  permissions?: Maybe<Array<Maybe<Permission>>>;
  /** Last 4 characters of the tokens. */
  tokens?: Maybe<Array<Maybe<ServiceAccountToken>>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
};

export type ObjectWithMetadata = {
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
};

export type MetadataItem = {
  __typename?: 'MetadataItem';
  /** Key of a metadata item. */
  key: Scalars['String'];
  /** Value of a metadata item. */
  value: Scalars['String'];
};

export type MetaStore = {
  __typename?: 'MetaStore';
  /** Name of metadata client group. */
  namespace: Scalars['String'];
  /** List of clients that stored metadata in a group. */
  clients: Array<Maybe<MetaClientStore>>;
};

export type MetaClientStore = {
  __typename?: 'MetaClientStore';
  /** Metadata client's name. */
  name: Scalars['String'];
  /** Metadata stored for a client. */
  metadata: Array<Maybe<MetaItem>>;
};

export type MetaItem = {
  __typename?: 'MetaItem';
  /** Key of a metadata item. */
  key: Scalars['String'];
  /** Value of a metadata item. */
  value: Scalars['String'];
};


/** Represents a permission object in a friendly form. */
export type Permission = {
  __typename?: 'Permission';
  /** Internal code for permission. */
  code: PermissionEnum;
  /** Describe action(s) allowed to do by permission. */
  name: Scalars['String'];
};

/** An enumeration. */
export enum PermissionEnum {
  ManageUsers = 'MANAGE_USERS',
  ManageStaff = 'MANAGE_STAFF',
  ManageServiceAccounts = 'MANAGE_SERVICE_ACCOUNTS',
  ManageApps = 'MANAGE_APPS',
  ManageDiscounts = 'MANAGE_DISCOUNTS',
  ManagePlugins = 'MANAGE_PLUGINS',
  ManageGiftCard = 'MANAGE_GIFT_CARD',
  ManageMenus = 'MANAGE_MENUS',
  ManageOrders = 'MANAGE_ORDERS',
  ManagePages = 'MANAGE_PAGES',
  ManageProducts = 'MANAGE_PRODUCTS',
  ManageProductTypesAndAttributes = 'MANAGE_PRODUCT_TYPES_AND_ATTRIBUTES',
  ManageShipping = 'MANAGE_SHIPPING',
  ManageSettings = 'MANAGE_SETTINGS',
  ManageTranslations = 'MANAGE_TRANSLATIONS',
  ManageCheckouts = 'MANAGE_CHECKOUTS'
}

/** Represents token data. */
export type ServiceAccountToken = Node & {
  __typename?: 'ServiceAccountToken';
  /** Name of the authenticated token. */
  name?: Maybe<Scalars['String']>;
  /** Last 4 characters of the token. */
  authToken?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
};

/** Represents app data. */
export type App = Node & ObjectWithMetadata & {
  __typename?: 'App';
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Name of the app. */
  name?: Maybe<Scalars['String']>;
  /** The date and time when the app was created. */
  created?: Maybe<Scalars['DateTime']>;
  /** Determine if app will be set active or not. */
  isActive?: Maybe<Scalars['Boolean']>;
  /** List of the app's permissions. */
  permissions?: Maybe<Array<Maybe<Permission>>>;
  /** Last 4 characters of the tokens. */
  tokens?: Maybe<Array<Maybe<AppToken>>>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** Type of the app. */
  type?: Maybe<AppTypeEnum>;
  /** List of webhooks assigned to this app. */
  webhooks?: Maybe<Array<Maybe<Webhook>>>;
  /** Description of this app. */
  aboutApp?: Maybe<Scalars['String']>;
  /** Description of the data privacy defined for this app. */
  dataPrivacy?: Maybe<Scalars['String']>;
  /** Url to details about the privacy policy on the app owner page. */
  dataPrivacyUrl?: Maybe<Scalars['String']>;
  /** Homepage of the app. */
  homepageUrl?: Maybe<Scalars['String']>;
  /** Support page for the app. */
  supportUrl?: Maybe<Scalars['String']>;
  /** Url to iframe with the configuration for the app. */
  configurationUrl?: Maybe<Scalars['String']>;
  /** Url to iframe with the app. */
  appUrl?: Maybe<Scalars['String']>;
  /** Version number of the app. */
  version?: Maybe<Scalars['String']>;
  /** JWT token used to authenticate by thridparty app. */
  accessToken?: Maybe<Scalars['String']>;
};

/** Represents token data. */
export type AppToken = Node & {
  __typename?: 'AppToken';
  /** Name of the authenticated token. */
  name?: Maybe<Scalars['String']>;
  /** Last 4 characters of the token. */
  authToken?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
};

/** An enumeration. */
export enum AppTypeEnum {
  Local = 'LOCAL',
  Thirdparty = 'THIRDPARTY'
}

export type WebhookCountableConnection = {
  __typename?: 'WebhookCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<WebhookCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

export type WebhookCountableEdge = {
  __typename?: 'WebhookCountableEdge';
  /** The item at the end of the edge. */
  node: Webhook;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type WebhookSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort webhooks by the selected field. */
  field: WebhookSortField;
};

export enum OrderDirection {
  /** Specifies an ascending sort order. */
  Asc = 'ASC',
  /** Specifies a descending sort order. */
  Desc = 'DESC'
}

export enum WebhookSortField {
  /** Sort webhooks by name. */
  Name = 'NAME',
  /** Sort webhooks by service account. */
  ServiceAccount = 'SERVICE_ACCOUNT',
  /** Sort webhooks by target url. */
  TargetUrl = 'TARGET_URL',
  /** Sort webhooks by service account. */
  App = 'APP'
}

export type WebhookFilterInput = {
  search?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
};


/** An enumeration. */
export enum WebhookSampleEventTypeEnum {
  OrderCreated = 'ORDER_CREATED',
  OrderFullyPaid = 'ORDER_FULLY_PAID',
  OrderUpdated = 'ORDER_UPDATED',
  OrderCancelled = 'ORDER_CANCELLED',
  OrderFulfilled = 'ORDER_FULFILLED',
  InvoiceRequested = 'INVOICE_REQUESTED',
  InvoiceDeleted = 'INVOICE_DELETED',
  InvoiceSent = 'INVOICE_SENT',
  CustomerCreated = 'CUSTOMER_CREATED',
  ProductCreated = 'PRODUCT_CREATED',
  ProductUpdated = 'PRODUCT_UPDATED',
  CheckoutQuantityChanged = 'CHECKOUT_QUANTITY_CHANGED',
  CheckoutCreated = 'CHECKOUT_CREATED',
  CheckoutUpdated = 'CHECKOUT_UPDATED',
  FulfillmentCreated = 'FULFILLMENT_CREATED'
}

/** Represents warehouse. */
export type Warehouse = Node & {
  __typename?: 'Warehouse';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  companyName: Scalars['String'];
  shippingZones: ShippingZoneCountableConnection;
  address: Address;
  email: Scalars['String'];
};


/** Represents warehouse. */
export type WarehouseShippingZonesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ShippingZoneCountableConnection = {
  __typename?: 'ShippingZoneCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<ShippingZoneCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ShippingZoneCountableEdge = {
  __typename?: 'ShippingZoneCountableEdge';
  /** The item at the end of the edge. */
  node: ShippingZone;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

/** Represents a shipping zone in the shop. Zones are the concept used only for grouping shipping methods in the dashboard, and are never exposed to the customers directly. */
export type ShippingZone = Node & {
  __typename?: 'ShippingZone';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  default: Scalars['Boolean'];
  /** Lowest and highest prices for the shipping. */
  priceRange?: Maybe<MoneyRange>;
  /** List of countries available for the method. */
  countries?: Maybe<Array<Maybe<CountryDisplay>>>;
  /** List of shipping methods available for orders shipped to countries within this shipping zone. */
  shippingMethods?: Maybe<Array<Maybe<ShippingMethod>>>;
  /** List of warehouses for shipping zone. */
  warehouses?: Maybe<Array<Maybe<Warehouse>>>;
};

/** Represents a range of amounts of money. */
export type MoneyRange = {
  __typename?: 'MoneyRange';
  /** Lower bound of a price range. */
  start?: Maybe<Money>;
  /** Upper bound of a price range. */
  stop?: Maybe<Money>;
};

/** Represents amount of money in specific currency. */
export type Money = {
  __typename?: 'Money';
  /** Currency code. */
  currency: Scalars['String'];
  /** Amount of money. */
  amount: Scalars['Float'];
  /**
   * Money formatted according to the current locale.
   * @deprecated Price formatting according to the current locale should be handled by the frontend client. This field will be removed after 2020-07-31.
   */
  localized: Scalars['String'];
};

export type CountryDisplay = {
  __typename?: 'CountryDisplay';
  /** Country code. */
  code: Scalars['String'];
  /** Country name. */
  country: Scalars['String'];
  /** Country tax. */
  vat?: Maybe<Vat>;
};

/** Represents a VAT rate for a country. */
export type Vat = {
  __typename?: 'VAT';
  /** Country code. */
  countryCode: Scalars['String'];
  /** Standard VAT rate in percent. */
  standardRate?: Maybe<Scalars['Float']>;
  /** Country's VAT rate exceptions for specific types of goods. */
  reducedRates: Array<Maybe<ReducedRate>>;
};

/** Represents a reduced VAT rate for a particular type of goods. */
export type ReducedRate = {
  __typename?: 'ReducedRate';
  /** Reduced VAT rate in percent. */
  rate: Scalars['Float'];
  /** A type of goods. */
  rateType: TaxRateType;
};

/** An enumeration. */
export enum TaxRateType {
  Accommodation = 'ACCOMMODATION',
  AdmissionToCulturalEvents = 'ADMISSION_TO_CULTURAL_EVENTS',
  AdmissionToEntertainmentEvents = 'ADMISSION_TO_ENTERTAINMENT_EVENTS',
  AdmissionToSportingEvents = 'ADMISSION_TO_SPORTING_EVENTS',
  Advertising = 'ADVERTISING',
  AgriculturalSupplies = 'AGRICULTURAL_SUPPLIES',
  BabyFoodstuffs = 'BABY_FOODSTUFFS',
  Bikes = 'BIKES',
  Books = 'BOOKS',
  ChildrensClothing = 'CHILDRENS_CLOTHING',
  DomesticFuel = 'DOMESTIC_FUEL',
  DomesticServices = 'DOMESTIC_SERVICES',
  EBooks = 'E_BOOKS',
  Foodstuffs = 'FOODSTUFFS',
  Hotels = 'HOTELS',
  Medical = 'MEDICAL',
  Newspapers = 'NEWSPAPERS',
  PassengerTransport = 'PASSENGER_TRANSPORT',
  Pharmaceuticals = 'PHARMACEUTICALS',
  PropertyRenovations = 'PROPERTY_RENOVATIONS',
  Restaurants = 'RESTAURANTS',
  SocialHousing = 'SOCIAL_HOUSING',
  Standard = 'STANDARD',
  Water = 'WATER',
  Wine = 'WINE'
}

/** Shipping method are the methods you'll use to get customer's orders to them. They are directly exposed to the customers. */
export type ShippingMethod = Node & {
  __typename?: 'ShippingMethod';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  price?: Maybe<Money>;
  minimumOrderPrice?: Maybe<Money>;
  maximumOrderPrice?: Maybe<Money>;
  minimumOrderWeight?: Maybe<Weight>;
  maximumOrderWeight?: Maybe<Weight>;
  /** Type of the shipping method. */
  type?: Maybe<ShippingMethodTypeEnum>;
  /** Returns translated shipping method fields for the given language code. */
  translation?: Maybe<ShippingMethodTranslation>;
};


/** Shipping method are the methods you'll use to get customer's orders to them. They are directly exposed to the customers. */
export type ShippingMethodTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Represents weight value in a specific weight unit. */
export type Weight = {
  __typename?: 'Weight';
  /** Weight unit. */
  unit: WeightUnitsEnum;
  /** Weight value. */
  value: Scalars['Float'];
};

/** An enumeration. */
export enum WeightUnitsEnum {
  Kg = 'KG',
  Lb = 'LB',
  Oz = 'OZ',
  G = 'G'
}

/** An enumeration. */
export enum ShippingMethodTypeEnum {
  Price = 'PRICE',
  Weight = 'WEIGHT'
}

export type ShippingMethodTranslation = Node & {
  __typename?: 'ShippingMethodTranslation';
  /** The ID of the object. */
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  /** Translation language. */
  language: LanguageDisplay;
};

export type LanguageDisplay = {
  __typename?: 'LanguageDisplay';
  /** ISO 639 representation of the language name. */
  code: LanguageCodeEnum;
  /** Full name of the language. */
  language: Scalars['String'];
};

/** An enumeration. */
export enum LanguageCodeEnum {
  Ar = 'AR',
  Az = 'AZ',
  Bg = 'BG',
  Bn = 'BN',
  Ca = 'CA',
  Cs = 'CS',
  Da = 'DA',
  De = 'DE',
  El = 'EL',
  En = 'EN',
  Es = 'ES',
  EsCo = 'ES_CO',
  Et = 'ET',
  Fa = 'FA',
  Fi = 'FI',
  Fr = 'FR',
  Hi = 'HI',
  Hu = 'HU',
  Hy = 'HY',
  Id = 'ID',
  Is = 'IS',
  It = 'IT',
  Ja = 'JA',
  Ka = 'KA',
  Km = 'KM',
  Ko = 'KO',
  Lt = 'LT',
  Mn = 'MN',
  My = 'MY',
  Nb = 'NB',
  Nl = 'NL',
  Pl = 'PL',
  Pt = 'PT',
  PtBr = 'PT_BR',
  Ro = 'RO',
  Ru = 'RU',
  Sk = 'SK',
  Sl = 'SL',
  Sq = 'SQ',
  Sr = 'SR',
  Sv = 'SV',
  Sw = 'SW',
  Ta = 'TA',
  Th = 'TH',
  Tr = 'TR',
  Uk = 'UK',
  Vi = 'VI',
  ZhHans = 'ZH_HANS',
  ZhHant = 'ZH_HANT'
}

/** Represents user address data. */
export type Address = Node & {
  __typename?: 'Address';
  /** The ID of the object. */
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  companyName: Scalars['String'];
  streetAddress1: Scalars['String'];
  streetAddress2: Scalars['String'];
  city: Scalars['String'];
  cityArea: Scalars['String'];
  postalCode: Scalars['String'];
  /** Shop's default country. */
  country: CountryDisplay;
  countryArea: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  /** Address is user's default shipping address. */
  isDefaultShippingAddress?: Maybe<Scalars['Boolean']>;
  /** Address is user's default billing address. */
  isDefaultBillingAddress?: Maybe<Scalars['Boolean']>;
};

export type WarehouseCountableConnection = {
  __typename?: 'WarehouseCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<WarehouseCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type WarehouseCountableEdge = {
  __typename?: 'WarehouseCountableEdge';
  /** The item at the end of the edge. */
  node: Warehouse;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type WarehouseFilterInput = {
  search?: Maybe<Scalars['String']>;
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type WarehouseSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort warehouses by the selected field. */
  field: WarehouseSortField;
};

export enum WarehouseSortField {
  /** Sort warehouses by name. */
  Name = 'NAME'
}

export type TranslatableItemConnection = {
  __typename?: 'TranslatableItemConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<TranslatableItemEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type TranslatableItemEdge = {
  __typename?: 'TranslatableItemEdge';
  /** The item at the end of the edge. */
  node: TranslatableItem;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type TranslatableItem = ProductTranslatableContent | CollectionTranslatableContent | CategoryTranslatableContent | AttributeTranslatableContent | AttributeValueTranslatableContent | ProductVariantTranslatableContent | PageTranslatableContent | ShippingMethodTranslatableContent | SaleTranslatableContent | VoucherTranslatableContent | MenuItemTranslatableContent;

export type ProductTranslatableContent = Node & {
  __typename?: 'ProductTranslatableContent';
  /** The ID of the object. */
  id: Scalars['ID'];
  seoTitle?: Maybe<Scalars['String']>;
  seoDescription?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  /** Returns translated product fields for the given language code. */
  translation?: Maybe<ProductTranslation>;
  /** Represents an individual item for sale in the storefront. */
  product?: Maybe<Product>;
};


export type ProductTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export type ProductTranslation = Node & {
  __typename?: 'ProductTranslation';
  /** The ID of the object. */
  id: Scalars['ID'];
  seoTitle?: Maybe<Scalars['String']>;
  seoDescription?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  /** Translation language. */
  language: LanguageDisplay;
};

/** Represents an individual item for sale in the storefront. */
export type Product = Node & ObjectWithMetadata & {
  __typename?: 'Product';
  /** The ID of the object. */
  id: Scalars['ID'];
  seoTitle?: Maybe<Scalars['String']>;
  seoDescription?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  publicationDate?: Maybe<Scalars['Date']>;
  productType: ProductType;
  slug: Scalars['String'];
  category?: Maybe<Category>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  chargeTaxes: Scalars['Boolean'];
  weight?: Maybe<Weight>;
  availableForPurchase?: Maybe<Scalars['Date']>;
  visibleInListings: Scalars['Boolean'];
  defaultVariant?: Maybe<ProductVariant>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /**
   * The storefront URL for the product.
   * @deprecated This field will be removed after 2020-07-31.
   */
  url: Scalars['String'];
  /** The main thumbnail for a product. */
  thumbnail?: Maybe<Image>;
  /** Lists the storefront product's pricing, the current price and discounts, only meant for displaying. */
  pricing?: Maybe<ProductPricingInfo>;
  /** Whether the product is in stock and visible or not. */
  isAvailable?: Maybe<Scalars['Boolean']>;
  /** The price of the cheapest variant (including discounts). */
  minimalVariantPrice?: Maybe<Money>;
  /** A type of tax. Assigned by enabled tax gateway */
  taxType?: Maybe<TaxType>;
  /** List of attributes assigned to this product. */
  attributes: Array<SelectedAttribute>;
  purchaseCost?: Maybe<MoneyRange>;
  margin?: Maybe<Margin>;
  /** Get a single product image by ID. */
  imageById?: Maybe<ProductImage>;
  /** List of variants for the product. */
  variants?: Maybe<Array<Maybe<ProductVariant>>>;
  /** List of images for the product. */
  images?: Maybe<Array<Maybe<ProductImage>>>;
  /** List of collections for the product. */
  collections?: Maybe<Array<Maybe<Collection>>>;
  /** Returns translated product fields for the given language code. */
  translation?: Maybe<ProductTranslation>;
  /** Whether the product is available for purchase. */
  isAvailableForPurchase?: Maybe<Scalars['Boolean']>;
  /** Whether the product is published. */
  isPublished: Scalars['Boolean'];
};


/** Represents an individual item for sale in the storefront. */
export type ProductThumbnailArgs = {
  size?: Maybe<Scalars['Int']>;
};


/** Represents an individual item for sale in the storefront. */
export type ProductImageByIdArgs = {
  id?: Maybe<Scalars['ID']>;
};


/** Represents an individual item for sale in the storefront. */
export type ProductTranslationArgs = {
  languageCode: LanguageCodeEnum;
};


/** Represents a type of product. It defines what attributes are available to products of this type. */
export type ProductType = Node & ObjectWithMetadata & {
  __typename?: 'ProductType';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  hasVariants: Scalars['Boolean'];
  isShippingRequired: Scalars['Boolean'];
  isDigital: Scalars['Boolean'];
  weight?: Maybe<Weight>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of products of this type. */
  products?: Maybe<ProductCountableConnection>;
  /** A type of tax rate. */
  taxRate?: Maybe<TaxRateType>;
  /** A type of tax. Assigned by enabled tax gateway */
  taxType?: Maybe<TaxType>;
  /** Variant attributes of that product type. */
  variantAttributes?: Maybe<Array<Maybe<Attribute>>>;
  /** Product attributes of that product type. */
  productAttributes?: Maybe<Array<Maybe<Attribute>>>;
  availableAttributes?: Maybe<AttributeCountableConnection>;
};


/** Represents a type of product. It defines what attributes are available to products of this type. */
export type ProductTypeProductsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Represents a type of product. It defines what attributes are available to products of this type. */
export type ProductTypeAvailableAttributesArgs = {
  filter?: Maybe<AttributeFilterInput>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ProductCountableConnection = {
  __typename?: 'ProductCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<ProductCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ProductCountableEdge = {
  __typename?: 'ProductCountableEdge';
  /** The item at the end of the edge. */
  node: Product;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

/** Representation of tax types fetched from tax gateway. */
export type TaxType = {
  __typename?: 'TaxType';
  /** Description of the tax type. */
  description?: Maybe<Scalars['String']>;
  /** External tax code used to identify given tax group. */
  taxCode?: Maybe<Scalars['String']>;
};

/** Custom attribute of a product. Attributes can be assigned to products and variants at the product type level. */
export type Attribute = Node & ObjectWithMetadata & {
  __typename?: 'Attribute';
  /** The ID of the object. */
  id: Scalars['ID'];
  productTypes: ProductTypeCountableConnection;
  productVariantTypes: ProductTypeCountableConnection;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** The input type to use for entering attribute values in the dashboard. */
  inputType?: Maybe<AttributeInputTypeEnum>;
  /** Name of an attribute displayed in the interface. */
  name?: Maybe<Scalars['String']>;
  /** Internal representation of an attribute name. */
  slug?: Maybe<Scalars['String']>;
  /** List of attribute's values. */
  values?: Maybe<Array<Maybe<AttributeValue>>>;
  /** Whether the attribute requires values to be passed or not. */
  valueRequired: Scalars['Boolean'];
  /** Whether the attribute should be visible or not in storefront. */
  visibleInStorefront: Scalars['Boolean'];
  /** Whether the attribute can be filtered in storefront. */
  filterableInStorefront: Scalars['Boolean'];
  /** Whether the attribute can be filtered in dashboard. */
  filterableInDashboard: Scalars['Boolean'];
  /** Whether the attribute can be displayed in the admin product list. */
  availableInGrid: Scalars['Boolean'];
  /** Returns translated attribute fields for the given language code. */
  translation?: Maybe<AttributeTranslation>;
  /** The position of the attribute in the storefront navigation (0 by default). */
  storefrontSearchPosition: Scalars['Int'];
};


/** Custom attribute of a product. Attributes can be assigned to products and variants at the product type level. */
export type AttributeProductTypesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Custom attribute of a product. Attributes can be assigned to products and variants at the product type level. */
export type AttributeProductVariantTypesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Custom attribute of a product. Attributes can be assigned to products and variants at the product type level. */
export type AttributeTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export type ProductTypeCountableConnection = {
  __typename?: 'ProductTypeCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<ProductTypeCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ProductTypeCountableEdge = {
  __typename?: 'ProductTypeCountableEdge';
  /** The item at the end of the edge. */
  node: ProductType;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

/** An enumeration. */
export enum AttributeInputTypeEnum {
  Dropdown = 'DROPDOWN',
  Multiselect = 'MULTISELECT'
}

/** Represents a value of an attribute. */
export type AttributeValue = Node & {
  __typename?: 'AttributeValue';
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Name of a value displayed in the interface. */
  name?: Maybe<Scalars['String']>;
  /** Internal representation of a value (unique per attribute). */
  slug?: Maybe<Scalars['String']>;
  /**
   * Type of value (used only when `value` field is set).
   * @deprecated Use the `inputType` field to determine the type of attribute's value. This field will be removed after 2020-07-31.
   */
  type?: Maybe<AttributeValueType>;
  /** Returns translated attribute value fields for the given language code. */
  translation?: Maybe<AttributeValueTranslation>;
  /** The input type to use for entering attribute values in the dashboard. */
  inputType?: Maybe<AttributeInputTypeEnum>;
};


/** Represents a value of an attribute. */
export type AttributeValueTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export enum AttributeValueType {
  Color = 'COLOR',
  Gradient = 'GRADIENT',
  Url = 'URL',
  String = 'STRING'
}

export type AttributeValueTranslation = Node & {
  __typename?: 'AttributeValueTranslation';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Translation language. */
  language: LanguageDisplay;
};

export type AttributeTranslation = Node & {
  __typename?: 'AttributeTranslation';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Translation language. */
  language: LanguageDisplay;
};

export type AttributeCountableConnection = {
  __typename?: 'AttributeCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<AttributeCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type AttributeCountableEdge = {
  __typename?: 'AttributeCountableEdge';
  /** The item at the end of the edge. */
  node: Attribute;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type AttributeFilterInput = {
  valueRequired?: Maybe<Scalars['Boolean']>;
  isVariantOnly?: Maybe<Scalars['Boolean']>;
  visibleInStorefront?: Maybe<Scalars['Boolean']>;
  filterableInStorefront?: Maybe<Scalars['Boolean']>;
  filterableInDashboard?: Maybe<Scalars['Boolean']>;
  availableInGrid?: Maybe<Scalars['Boolean']>;
  search?: Maybe<Scalars['String']>;
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>;
  inCollection?: Maybe<Scalars['ID']>;
  inCategory?: Maybe<Scalars['ID']>;
};

/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type Category = Node & ObjectWithMetadata & {
  __typename?: 'Category';
  seoTitle?: Maybe<Scalars['String']>;
  seoDescription?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  slug: Scalars['String'];
  parent?: Maybe<Category>;
  level: Scalars['Int'];
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of ancestors of the category. */
  ancestors?: Maybe<CategoryCountableConnection>;
  /** List of products in the category. */
  products?: Maybe<ProductCountableConnection>;
  /**
   * The storefront's URL for the category.
   * @deprecated This field will be removed after 2020-07-31.
   */
  url?: Maybe<Scalars['String']>;
  /** List of children of the category. */
  children?: Maybe<CategoryCountableConnection>;
  backgroundImage?: Maybe<Image>;
  /** Returns translated category fields for the given language code. */
  translation?: Maybe<CategoryTranslation>;
};


/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type CategoryAncestorsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type CategoryProductsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type CategoryChildrenArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type CategoryBackgroundImageArgs = {
  size?: Maybe<Scalars['Int']>;
};


/** Represents a single category of products. Categories allow to organize products in a tree-hierarchies which can be used for navigation in the storefront. */
export type CategoryTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export type CategoryCountableConnection = {
  __typename?: 'CategoryCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<CategoryCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type CategoryCountableEdge = {
  __typename?: 'CategoryCountableEdge';
  /** The item at the end of the edge. */
  node: Category;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

/** Represents an image. */
export type Image = {
  __typename?: 'Image';
  /** The URL of the image. */
  url: Scalars['String'];
  /** Alt text for an image. */
  alt?: Maybe<Scalars['String']>;
};

export type CategoryTranslation = Node & {
  __typename?: 'CategoryTranslation';
  seoTitle?: Maybe<Scalars['String']>;
  seoDescription?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  /** Translation language. */
  language: LanguageDisplay;
};

/** Represents a version of a product such as different size or color. */
export type ProductVariant = Node & ObjectWithMetadata & {
  __typename?: 'ProductVariant';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  sku: Scalars['String'];
  product: Product;
  trackInventory: Scalars['Boolean'];
  weight?: Maybe<Weight>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /**
   * Quantity of a product available for sale.
   * @deprecated Use the stock field instead. This field will be removed after 2020-07-31.
   */
  quantity: Scalars['Int'];
  /**
   * Quantity allocated for orders.
   * @deprecated Use the stock field instead. This field will be removed after 2020-07-31.
   */
  quantityAllocated?: Maybe<Scalars['Int']>;
  /**
   * Quantity of a product available for sale.
   * @deprecated Use the quantityAvailable field instead. This field will be removed after 2020-07-31.
   */
  stockQuantity: Scalars['Int'];
  /** Base price of a product variant. This field is restricted for admins. Use the pricing field to get the public price for customers. */
  price?: Maybe<Money>;
  /** Lists the storefront variant's pricing, the current price and discounts, only meant for displaying. */
  pricing?: Maybe<VariantPricingInfo>;
  /**
   * Whether the variant is in stock and visible or not.
   * @deprecated Use the stock field instead. This field will be removed after 2020-07-31.
   */
  isAvailable?: Maybe<Scalars['Boolean']>;
  /** List of attributes assigned to this variant. */
  attributes: Array<SelectedAttribute>;
  /** Cost price of the variant. */
  costPrice?: Maybe<Money>;
  /** Gross margin percentage value. */
  margin?: Maybe<Scalars['Int']>;
  /** Total quantity ordered. */
  quantityOrdered?: Maybe<Scalars['Int']>;
  /** Total revenue generated by a variant in given period of time. Note: this field should be queried using `reportProductSales` query as it uses optimizations suitable for such calculations. */
  revenue?: Maybe<TaxedMoney>;
  /** List of images for the product variant. */
  images?: Maybe<Array<Maybe<ProductImage>>>;
  /** Returns translated product variant fields for the given language code. */
  translation?: Maybe<ProductVariantTranslation>;
  /** Digital content for the product variant. */
  digitalContent?: Maybe<DigitalContent>;
  /** Stocks for the product variant. */
  stocks?: Maybe<Array<Maybe<Stock>>>;
  /** Quantity of a product available for sale in one checkout. */
  quantityAvailable: Scalars['Int'];
};


/** Represents a version of a product such as different size or color. */
export type ProductVariantRevenueArgs = {
  period?: Maybe<ReportingPeriod>;
};


/** Represents a version of a product such as different size or color. */
export type ProductVariantTranslationArgs = {
  languageCode: LanguageCodeEnum;
};


/** Represents a version of a product such as different size or color. */
export type ProductVariantStocksArgs = {
  countryCode?: Maybe<CountryCode>;
};


/** Represents a version of a product such as different size or color. */
export type ProductVariantQuantityAvailableArgs = {
  countryCode?: Maybe<CountryCode>;
};

/** Represents availability of a variant in the storefront. */
export type VariantPricingInfo = {
  __typename?: 'VariantPricingInfo';
  /** Whether it is in sale or not. */
  onSale?: Maybe<Scalars['Boolean']>;
  /** The discount amount if in sale (null otherwise). */
  discount?: Maybe<TaxedMoney>;
  /** The discount amount in the local currency. */
  discountLocalCurrency?: Maybe<TaxedMoney>;
  /** The price, with any discount subtracted. */
  price?: Maybe<TaxedMoney>;
  /** The price without any discount. */
  priceUndiscounted?: Maybe<TaxedMoney>;
  /** The discounted price in the local currency. */
  priceLocalCurrency?: Maybe<TaxedMoney>;
};

/** Represents a monetary value with taxes. In cases where taxes were not applied, net and gross values will be equal. */
export type TaxedMoney = {
  __typename?: 'TaxedMoney';
  /** Currency code. */
  currency: Scalars['String'];
  /** Amount of money including taxes. */
  gross: Money;
  /** Amount of money without taxes. */
  net: Money;
  /** Amount of taxes. */
  tax: Money;
};

/** Represents a custom attribute. */
export type SelectedAttribute = {
  __typename?: 'SelectedAttribute';
  /** Name of an attribute displayed in the interface. */
  attribute: Attribute;
  /** Values of an attribute. */
  values: Array<Maybe<AttributeValue>>;
};

export enum ReportingPeriod {
  Today = 'TODAY',
  ThisMonth = 'THIS_MONTH'
}

/** Represents a product image. */
export type ProductImage = Node & {
  __typename?: 'ProductImage';
  /** The ID of the object. */
  id: Scalars['ID'];
  sortOrder?: Maybe<Scalars['Int']>;
  alt: Scalars['String'];
  /** The URL of the image. */
  url: Scalars['String'];
};


/** Represents a product image. */
export type ProductImageUrlArgs = {
  size?: Maybe<Scalars['Int']>;
};

export type ProductVariantTranslation = Node & {
  __typename?: 'ProductVariantTranslation';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Translation language. */
  language: LanguageDisplay;
};

export type DigitalContent = Node & ObjectWithMetadata & {
  __typename?: 'DigitalContent';
  useDefaultSettings: Scalars['Boolean'];
  automaticFulfillment: Scalars['Boolean'];
  productVariant: ProductVariant;
  contentFile: Scalars['String'];
  maxDownloads?: Maybe<Scalars['Int']>;
  urlValidDays?: Maybe<Scalars['Int']>;
  /** List of URLs for the digital variant. */
  urls?: Maybe<Array<Maybe<DigitalContentUrl>>>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
};

export type DigitalContentUrl = Node & {
  __typename?: 'DigitalContentUrl';
  content: DigitalContent;
  created: Scalars['DateTime'];
  downloadNum: Scalars['Int'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** URL for digital content. */
  url?: Maybe<Scalars['String']>;
  /** UUID of digital content. */
  token: Scalars['UUID'];
};


/** Represents stock. */
export type Stock = Node & {
  __typename?: 'Stock';
  warehouse: Warehouse;
  productVariant: ProductVariant;
  /** Quantity of a product in the warehouse's possession, including the allocated stock that is waiting for shipment. */
  quantity: Scalars['Int'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Quantity allocated for orders */
  quantityAllocated: Scalars['Int'];
};

/** An enumeration. */
export enum CountryCode {
  Af = 'AF',
  Ax = 'AX',
  Al = 'AL',
  Dz = 'DZ',
  As = 'AS',
  Ad = 'AD',
  Ao = 'AO',
  Ai = 'AI',
  Aq = 'AQ',
  Ag = 'AG',
  Ar = 'AR',
  Am = 'AM',
  Aw = 'AW',
  Au = 'AU',
  At = 'AT',
  Az = 'AZ',
  Bs = 'BS',
  Bh = 'BH',
  Bd = 'BD',
  Bb = 'BB',
  By = 'BY',
  Be = 'BE',
  Bz = 'BZ',
  Bj = 'BJ',
  Bm = 'BM',
  Bt = 'BT',
  Bo = 'BO',
  Bq = 'BQ',
  Ba = 'BA',
  Bw = 'BW',
  Bv = 'BV',
  Br = 'BR',
  Io = 'IO',
  Bn = 'BN',
  Bg = 'BG',
  Bf = 'BF',
  Bi = 'BI',
  Cv = 'CV',
  Kh = 'KH',
  Cm = 'CM',
  Ca = 'CA',
  Ky = 'KY',
  Cf = 'CF',
  Td = 'TD',
  Cl = 'CL',
  Cn = 'CN',
  Cx = 'CX',
  Cc = 'CC',
  Co = 'CO',
  Km = 'KM',
  Cg = 'CG',
  Cd = 'CD',
  Ck = 'CK',
  Cr = 'CR',
  Ci = 'CI',
  Hr = 'HR',
  Cu = 'CU',
  Cw = 'CW',
  Cy = 'CY',
  Cz = 'CZ',
  Dk = 'DK',
  Dj = 'DJ',
  Dm = 'DM',
  Do = 'DO',
  Ec = 'EC',
  Eg = 'EG',
  Sv = 'SV',
  Gq = 'GQ',
  Er = 'ER',
  Ee = 'EE',
  Sz = 'SZ',
  Et = 'ET',
  Eu = 'EU',
  Fk = 'FK',
  Fo = 'FO',
  Fj = 'FJ',
  Fi = 'FI',
  Fr = 'FR',
  Gf = 'GF',
  Pf = 'PF',
  Tf = 'TF',
  Ga = 'GA',
  Gm = 'GM',
  Ge = 'GE',
  De = 'DE',
  Gh = 'GH',
  Gi = 'GI',
  Gr = 'GR',
  Gl = 'GL',
  Gd = 'GD',
  Gp = 'GP',
  Gu = 'GU',
  Gt = 'GT',
  Gg = 'GG',
  Gn = 'GN',
  Gw = 'GW',
  Gy = 'GY',
  Ht = 'HT',
  Hm = 'HM',
  Va = 'VA',
  Hn = 'HN',
  Hk = 'HK',
  Hu = 'HU',
  Is = 'IS',
  In = 'IN',
  Id = 'ID',
  Ir = 'IR',
  Iq = 'IQ',
  Ie = 'IE',
  Im = 'IM',
  Il = 'IL',
  It = 'IT',
  Jm = 'JM',
  Jp = 'JP',
  Je = 'JE',
  Jo = 'JO',
  Kz = 'KZ',
  Ke = 'KE',
  Ki = 'KI',
  Kw = 'KW',
  Kg = 'KG',
  La = 'LA',
  Lv = 'LV',
  Lb = 'LB',
  Ls = 'LS',
  Lr = 'LR',
  Ly = 'LY',
  Li = 'LI',
  Lt = 'LT',
  Lu = 'LU',
  Mo = 'MO',
  Mg = 'MG',
  Mw = 'MW',
  My = 'MY',
  Mv = 'MV',
  Ml = 'ML',
  Mt = 'MT',
  Mh = 'MH',
  Mq = 'MQ',
  Mr = 'MR',
  Mu = 'MU',
  Yt = 'YT',
  Mx = 'MX',
  Fm = 'FM',
  Md = 'MD',
  Mc = 'MC',
  Mn = 'MN',
  Me = 'ME',
  Ms = 'MS',
  Ma = 'MA',
  Mz = 'MZ',
  Mm = 'MM',
  Na = 'NA',
  Nr = 'NR',
  Np = 'NP',
  Nl = 'NL',
  Nc = 'NC',
  Nz = 'NZ',
  Ni = 'NI',
  Ne = 'NE',
  Ng = 'NG',
  Nu = 'NU',
  Nf = 'NF',
  Kp = 'KP',
  Mk = 'MK',
  Mp = 'MP',
  No = 'NO',
  Om = 'OM',
  Pk = 'PK',
  Pw = 'PW',
  Ps = 'PS',
  Pa = 'PA',
  Pg = 'PG',
  Py = 'PY',
  Pe = 'PE',
  Ph = 'PH',
  Pn = 'PN',
  Pl = 'PL',
  Pt = 'PT',
  Pr = 'PR',
  Qa = 'QA',
  Re = 'RE',
  Ro = 'RO',
  Ru = 'RU',
  Rw = 'RW',
  Bl = 'BL',
  Sh = 'SH',
  Kn = 'KN',
  Lc = 'LC',
  Mf = 'MF',
  Pm = 'PM',
  Vc = 'VC',
  Ws = 'WS',
  Sm = 'SM',
  St = 'ST',
  Sa = 'SA',
  Sn = 'SN',
  Rs = 'RS',
  Sc = 'SC',
  Sl = 'SL',
  Sg = 'SG',
  Sx = 'SX',
  Sk = 'SK',
  Si = 'SI',
  Sb = 'SB',
  So = 'SO',
  Za = 'ZA',
  Gs = 'GS',
  Kr = 'KR',
  Ss = 'SS',
  Es = 'ES',
  Lk = 'LK',
  Sd = 'SD',
  Sr = 'SR',
  Sj = 'SJ',
  Se = 'SE',
  Ch = 'CH',
  Sy = 'SY',
  Tw = 'TW',
  Tj = 'TJ',
  Tz = 'TZ',
  Th = 'TH',
  Tl = 'TL',
  Tg = 'TG',
  Tk = 'TK',
  To = 'TO',
  Tt = 'TT',
  Tn = 'TN',
  Tr = 'TR',
  Tm = 'TM',
  Tc = 'TC',
  Tv = 'TV',
  Ug = 'UG',
  Ua = 'UA',
  Ae = 'AE',
  Gb = 'GB',
  Um = 'UM',
  Us = 'US',
  Uy = 'UY',
  Uz = 'UZ',
  Vu = 'VU',
  Ve = 'VE',
  Vn = 'VN',
  Vg = 'VG',
  Vi = 'VI',
  Wf = 'WF',
  Eh = 'EH',
  Ye = 'YE',
  Zm = 'ZM',
  Zw = 'ZW'
}

/** Represents availability of a product in the storefront. */
export type ProductPricingInfo = {
  __typename?: 'ProductPricingInfo';
  /** Whether it is in sale or not. */
  onSale?: Maybe<Scalars['Boolean']>;
  /** The discount amount if in sale (null otherwise). */
  discount?: Maybe<TaxedMoney>;
  /** The discount amount in the local currency. */
  discountLocalCurrency?: Maybe<TaxedMoney>;
  /** The discounted price range of the product variants. */
  priceRange?: Maybe<TaxedMoneyRange>;
  /** The undiscounted price range of the product variants. */
  priceRangeUndiscounted?: Maybe<TaxedMoneyRange>;
  /** The discounted price range of the product variants in the local currency. */
  priceRangeLocalCurrency?: Maybe<TaxedMoneyRange>;
};

/** Represents a range of monetary values. */
export type TaxedMoneyRange = {
  __typename?: 'TaxedMoneyRange';
  /** Lower bound of a price range. */
  start?: Maybe<TaxedMoney>;
  /** Upper bound of a price range. */
  stop?: Maybe<TaxedMoney>;
};

export type Margin = {
  __typename?: 'Margin';
  start?: Maybe<Scalars['Int']>;
  stop?: Maybe<Scalars['Int']>;
};

/** Represents a collection of products. */
export type Collection = Node & ObjectWithMetadata & {
  __typename?: 'Collection';
  seoTitle?: Maybe<Scalars['String']>;
  seoDescription?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  publicationDate?: Maybe<Scalars['Date']>;
  slug: Scalars['String'];
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of products in this collection. */
  products?: Maybe<ProductCountableConnection>;
  backgroundImage?: Maybe<Image>;
  /** Returns translated collection fields for the given language code. */
  translation?: Maybe<CollectionTranslation>;
  /** Whether the collection is published. */
  isPublished: Scalars['Boolean'];
};


/** Represents a collection of products. */
export type CollectionProductsArgs = {
  filter?: Maybe<ProductFilterInput>;
  sortBy?: Maybe<ProductOrder>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Represents a collection of products. */
export type CollectionBackgroundImageArgs = {
  size?: Maybe<Scalars['Int']>;
};


/** Represents a collection of products. */
export type CollectionTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export type ProductFilterInput = {
  isPublished?: Maybe<Scalars['Boolean']>;
  collections?: Maybe<Array<Maybe<Scalars['ID']>>>;
  categories?: Maybe<Array<Maybe<Scalars['ID']>>>;
  hasCategory?: Maybe<Scalars['Boolean']>;
  attributes?: Maybe<Array<Maybe<AttributeInput>>>;
  stockAvailability?: Maybe<StockAvailability>;
  productType?: Maybe<Scalars['ID']>;
  stocks?: Maybe<ProductStockFilterInput>;
  search?: Maybe<Scalars['String']>;
  price?: Maybe<PriceRangeInput>;
  minimalPrice?: Maybe<PriceRangeInput>;
  productTypes?: Maybe<Array<Maybe<Scalars['ID']>>>;
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type AttributeInput = {
  /** Internal representation of an attribute name. */
  slug: Scalars['String'];
  /** [Deprecated] Internal representation of a value (unique per attribute). This field will be removed after 2020-07-31. */
  value?: Maybe<Scalars['String']>;
  /** Internal representation of a value (unique per attribute). */
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum StockAvailability {
  InStock = 'IN_STOCK',
  OutOfStock = 'OUT_OF_STOCK'
}

export type ProductStockFilterInput = {
  warehouseIds?: Maybe<Array<Scalars['ID']>>;
  quantity?: Maybe<IntRangeInput>;
};

export type IntRangeInput = {
  /** Value greater than or equal to. */
  gte?: Maybe<Scalars['Int']>;
  /** Value less than or equal to. */
  lte?: Maybe<Scalars['Int']>;
};

export type PriceRangeInput = {
  /** Price greater than or equal to. */
  gte?: Maybe<Scalars['Float']>;
  /** Price less than or equal to. */
  lte?: Maybe<Scalars['Float']>;
};

export type ProductOrder = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /**
   * Sort product by the selected attribute's values.
   * Note: this doesn't take translations into account yet.
   */
  attributeId?: Maybe<Scalars['ID']>;
  /** Sort products by the selected field. */
  field?: Maybe<ProductOrderField>;
};

export enum ProductOrderField {
  /** Sort products by name. */
  Name = 'NAME',
  /** Sort products by price. */
  Price = 'PRICE',
  /** Sort products by a minimal price of a product's variant. */
  MinimalPrice = 'MINIMAL_PRICE',
  /** Sort products by update date. */
  Date = 'DATE',
  /** Sort products by type. */
  Type = 'TYPE',
  /** Sort products by publication status. */
  Published = 'PUBLISHED',
  /** Sort products by publication date. */
  PublicationDate = 'PUBLICATION_DATE',
  /** Sort products by collection. Note: This option is available only for the `Collection.products` query. */
  Collection = 'COLLECTION'
}

export type CollectionTranslation = Node & {
  __typename?: 'CollectionTranslation';
  seoTitle?: Maybe<Scalars['String']>;
  seoDescription?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  /** Translation language. */
  language: LanguageDisplay;
};

export type CollectionTranslatableContent = Node & {
  __typename?: 'CollectionTranslatableContent';
  seoTitle?: Maybe<Scalars['String']>;
  seoDescription?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  /** Returns translated collection fields for the given language code. */
  translation?: Maybe<CollectionTranslation>;
  /** Represents a collection of products. */
  collection?: Maybe<Collection>;
};


export type CollectionTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export type CategoryTranslatableContent = Node & {
  __typename?: 'CategoryTranslatableContent';
  seoTitle?: Maybe<Scalars['String']>;
  seoDescription?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  descriptionJson: Scalars['JSONString'];
  /** Returns translated category fields for the given language code. */
  translation?: Maybe<CategoryTranslation>;
  /** Represents a single category of products. */
  category?: Maybe<Category>;
};


export type CategoryTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export type AttributeTranslatableContent = Node & {
  __typename?: 'AttributeTranslatableContent';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Returns translated attribute fields for the given language code. */
  translation?: Maybe<AttributeTranslation>;
  /** Custom attribute of a product. */
  attribute?: Maybe<Attribute>;
};


export type AttributeTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export type AttributeValueTranslatableContent = Node & {
  __typename?: 'AttributeValueTranslatableContent';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Returns translated attribute value fields for the given language code. */
  translation?: Maybe<AttributeValueTranslation>;
  /** Represents a value of an attribute. */
  attributeValue?: Maybe<AttributeValue>;
};


export type AttributeValueTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export type ProductVariantTranslatableContent = Node & {
  __typename?: 'ProductVariantTranslatableContent';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Returns translated product variant fields for the given language code. */
  translation?: Maybe<ProductVariantTranslation>;
  /** Represents a version of a product such as different size or color. */
  productVariant?: Maybe<ProductVariant>;
};


export type ProductVariantTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export type PageTranslatableContent = Node & {
  __typename?: 'PageTranslatableContent';
  seoTitle?: Maybe<Scalars['String']>;
  seoDescription?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  title: Scalars['String'];
  content: Scalars['String'];
  contentJson: Scalars['JSONString'];
  /** Returns translated page fields for the given language code. */
  translation?: Maybe<PageTranslation>;
  /** ('A static page that can be manually added by a shop operator ', 'through the dashboard.') */
  page?: Maybe<Page>;
};


export type PageTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export type PageTranslation = Node & {
  __typename?: 'PageTranslation';
  seoTitle?: Maybe<Scalars['String']>;
  seoDescription?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  title: Scalars['String'];
  content: Scalars['String'];
  contentJson: Scalars['JSONString'];
  /** Translation language. */
  language: LanguageDisplay;
};

/** A static page that can be manually added by a shop operator through the dashboard. */
export type Page = Node & ObjectWithMetadata & {
  __typename?: 'Page';
  seoTitle?: Maybe<Scalars['String']>;
  seoDescription?: Maybe<Scalars['String']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  title: Scalars['String'];
  content: Scalars['String'];
  contentJson: Scalars['JSONString'];
  publicationDate?: Maybe<Scalars['Date']>;
  slug: Scalars['String'];
  created: Scalars['DateTime'];
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** Returns translated page fields for the given language code. */
  translation?: Maybe<PageTranslation>;
  /** Whether the page is published. */
  isPublished: Scalars['Boolean'];
};


/** A static page that can be manually added by a shop operator through the dashboard. */
export type PageTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export type ShippingMethodTranslatableContent = Node & {
  __typename?: 'ShippingMethodTranslatableContent';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Returns translated shipping method fields for the given language code. */
  translation?: Maybe<ShippingMethodTranslation>;
  /** Shipping method are the methods you'll use to get customer's orders  to them. They are directly exposed to the customers. */
  shippingMethod?: Maybe<ShippingMethod>;
};


export type ShippingMethodTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export type SaleTranslatableContent = Node & {
  __typename?: 'SaleTranslatableContent';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Returns translated sale fields for the given language code. */
  translation?: Maybe<SaleTranslation>;
  /** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
  sale?: Maybe<Sale>;
};


export type SaleTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export type SaleTranslation = Node & {
  __typename?: 'SaleTranslation';
  /** The ID of the object. */
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  /** Translation language. */
  language: LanguageDisplay;
};

/** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
export type Sale = Node & {
  __typename?: 'Sale';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  type: SaleType;
  value: Scalars['Float'];
  startDate: Scalars['DateTime'];
  endDate?: Maybe<Scalars['DateTime']>;
  /** List of categories this sale applies to. */
  categories?: Maybe<CategoryCountableConnection>;
  /** List of collections this sale applies to. */
  collections?: Maybe<CollectionCountableConnection>;
  /** List of products this sale applies to. */
  products?: Maybe<ProductCountableConnection>;
  /** Returns translated sale fields for the given language code. */
  translation?: Maybe<SaleTranslation>;
};


/** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
export type SaleCategoriesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
export type SaleCollectionsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
export type SaleProductsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Sales allow creating discounts for categories, collections or products and are visible to all the customers. */
export type SaleTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** An enumeration. */
export enum SaleType {
  /** USD */
  Fixed = 'FIXED',
  /** % */
  Percentage = 'PERCENTAGE'
}

export type CollectionCountableConnection = {
  __typename?: 'CollectionCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<CollectionCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type CollectionCountableEdge = {
  __typename?: 'CollectionCountableEdge';
  /** The item at the end of the edge. */
  node: Collection;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type VoucherTranslatableContent = Node & {
  __typename?: 'VoucherTranslatableContent';
  /** The ID of the object. */
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  /** Returns translated voucher fields for the given language code. */
  translation?: Maybe<VoucherTranslation>;
  /** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
  voucher?: Maybe<Voucher>;
};


export type VoucherTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export type VoucherTranslation = Node & {
  __typename?: 'VoucherTranslation';
  /** The ID of the object. */
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  /** Translation language. */
  language: LanguageDisplay;
};

/** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
export type Voucher = Node & {
  __typename?: 'Voucher';
  /** The ID of the object. */
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  /** Determines a type of voucher. */
  type: VoucherTypeEnum;
  code: Scalars['String'];
  usageLimit?: Maybe<Scalars['Int']>;
  used: Scalars['Int'];
  startDate: Scalars['DateTime'];
  endDate?: Maybe<Scalars['DateTime']>;
  applyOncePerOrder: Scalars['Boolean'];
  applyOncePerCustomer: Scalars['Boolean'];
  /** Determines a type of discount for voucher - value or percentage */
  discountValueType: DiscountValueTypeEnum;
  discountValue: Scalars['Float'];
  minSpent?: Maybe<Money>;
  minCheckoutItemsQuantity?: Maybe<Scalars['Int']>;
  /** List of categories this voucher applies to. */
  categories?: Maybe<CategoryCountableConnection>;
  /** List of collections this voucher applies to. */
  collections?: Maybe<CollectionCountableConnection>;
  /** List of products this voucher applies to. */
  products?: Maybe<ProductCountableConnection>;
  /** List of countries available for the shipping voucher. */
  countries?: Maybe<Array<Maybe<CountryDisplay>>>;
  /** Returns translated voucher fields for the given language code. */
  translation?: Maybe<VoucherTranslation>;
};


/** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
export type VoucherCategoriesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
export type VoucherCollectionsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
export type VoucherProductsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Vouchers allow giving discounts to particular customers on categories, collections or specific products. They can be used during checkout by providing valid voucher codes. */
export type VoucherTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export enum VoucherTypeEnum {
  Shipping = 'SHIPPING',
  EntireOrder = 'ENTIRE_ORDER',
  SpecificProduct = 'SPECIFIC_PRODUCT'
}

export enum DiscountValueTypeEnum {
  Fixed = 'FIXED',
  Percentage = 'PERCENTAGE'
}

export type MenuItemTranslatableContent = Node & {
  __typename?: 'MenuItemTranslatableContent';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Returns translated menu item fields for the given language code. */
  translation?: Maybe<MenuItemTranslation>;
  /** Represents a single item of the related menu. Can store categories, collection or pages. */
  menuItem?: Maybe<MenuItem>;
};


export type MenuItemTranslatableContentTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

export type MenuItemTranslation = Node & {
  __typename?: 'MenuItemTranslation';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Translation language. */
  language: LanguageDisplay;
};

/** Represents a single item of the related menu. Can store categories, collection or pages. */
export type MenuItem = Node & {
  __typename?: 'MenuItem';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  menu: Menu;
  parent?: Maybe<MenuItem>;
  category?: Maybe<Category>;
  collection?: Maybe<Collection>;
  page?: Maybe<Page>;
  level: Scalars['Int'];
  children?: Maybe<Array<Maybe<MenuItem>>>;
  /** URL to the menu item. */
  url?: Maybe<Scalars['String']>;
  /** Returns translated menu item fields for the given language code. */
  translation?: Maybe<MenuItemTranslation>;
};


/** Represents a single item of the related menu. Can store categories, collection or pages. */
export type MenuItemTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Represents a single menu - an object that is used to help navigate through the store. */
export type Menu = Node & {
  __typename?: 'Menu';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  items?: Maybe<Array<Maybe<MenuItem>>>;
};

export enum TranslatableKinds {
  Attribute = 'ATTRIBUTE',
  AttributeValue = 'ATTRIBUTE_VALUE',
  Category = 'CATEGORY',
  Collection = 'COLLECTION',
  MenuItem = 'MENU_ITEM',
  Page = 'PAGE',
  Product = 'PRODUCT',
  Sale = 'SALE',
  ShippingMethod = 'SHIPPING_METHOD',
  Variant = 'VARIANT',
  Voucher = 'VOUCHER'
}

export type StockCountableConnection = {
  __typename?: 'StockCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<StockCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type StockCountableEdge = {
  __typename?: 'StockCountableEdge';
  /** The item at the end of the edge. */
  node: Stock;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type StockFilterInput = {
  quantity?: Maybe<Scalars['Float']>;
  search?: Maybe<Scalars['String']>;
};

/** Represents a shop resource containing general shop data and configuration. */
export type Shop = {
  __typename?: 'Shop';
  /** List of available payment gateways. */
  availablePaymentGateways: Array<PaymentGateway>;
  /** Customer's geolocalization data. */
  geolocalization?: Maybe<Geolocalization>;
  /** List of configured authorization keys. Authorization keys are used to enable third-party OAuth authorization (currently Facebook or Google). */
  authorizationKeys: Array<Maybe<AuthorizationKey>>;
  /** List of countries available in the shop. */
  countries: Array<CountryDisplay>;
  /**
   * List of available currencies.
   * @deprecated This field will be removed in Saleor 3.0
   */
  currencies: Array<Maybe<Scalars['String']>>;
  /**
   * Shop's default currency.
   * @deprecated This field will be removed in Saleor 3.0
   */
  defaultCurrency: Scalars['String'];
  /** Shop's default country. */
  defaultCountry?: Maybe<CountryDisplay>;
  /** Default shop's email sender's name. */
  defaultMailSenderName?: Maybe<Scalars['String']>;
  /** Default shop's email sender's address. */
  defaultMailSenderAddress?: Maybe<Scalars['String']>;
  /** Shop's description. */
  description?: Maybe<Scalars['String']>;
  /** Shop's domain data. */
  domain: Domain;
  /**
   * Collection displayed on homepage.
   * @deprecated Use the `collection` query with the `slug` parameter. This field will be removed in Saleor 3.0
   */
  homepageCollection?: Maybe<Collection>;
  /** List of the shops's supported languages. */
  languages: Array<Maybe<LanguageDisplay>>;
  /** Shop's name. */
  name: Scalars['String'];
  /**
   * Shop's navigation.
   * @deprecated Fetch menus using the `menu` query with `slug` parameter.
   */
  navigation?: Maybe<Navigation>;
  /** List of available permissions. */
  permissions: Array<Maybe<Permission>>;
  /** List of possible phone prefixes. */
  phonePrefixes: Array<Maybe<Scalars['String']>>;
  /** Header text. */
  headerText?: Maybe<Scalars['String']>;
  /** Include taxes in prices. */
  includeTaxesInPrices: Scalars['Boolean'];
  /** Display prices with tax in store. */
  displayGrossPrices: Scalars['Boolean'];
  /** Charge taxes on shipping. */
  chargeTaxesOnShipping: Scalars['Boolean'];
  /** Enable inventory tracking. */
  trackInventoryByDefault?: Maybe<Scalars['Boolean']>;
  /** Default weight unit. */
  defaultWeightUnit?: Maybe<WeightUnitsEnum>;
  /** Returns translated shop fields for the given language code. */
  translation?: Maybe<ShopTranslation>;
  /** Enable automatic fulfillment for all digital products. */
  automaticFulfillmentDigitalProducts?: Maybe<Scalars['Boolean']>;
  /** Default number of max downloads per digital content URL. */
  defaultDigitalMaxDownloads?: Maybe<Scalars['Int']>;
  /** Default number of days which digital content URL will be valid. */
  defaultDigitalUrlValidDays?: Maybe<Scalars['Int']>;
  /** Company address. */
  companyAddress?: Maybe<Address>;
  /** URL of a view where customers can set their password. */
  customerSetPasswordUrl?: Maybe<Scalars['String']>;
  /** List of staff notification recipients. */
  staffNotificationRecipients?: Maybe<Array<Maybe<StaffNotificationRecipient>>>;
};


/** Represents a shop resource containing general shop data and configuration. */
export type ShopAvailablePaymentGatewaysArgs = {
  currency?: Maybe<Scalars['String']>;
};


/** Represents a shop resource containing general shop data and configuration. */
export type ShopCountriesArgs = {
  languageCode?: Maybe<LanguageCodeEnum>;
};


/** Represents a shop resource containing general shop data and configuration. */
export type ShopTranslationArgs = {
  languageCode: LanguageCodeEnum;
};

/** Available payment gateway backend with configuration necessary to setup client. */
export type PaymentGateway = {
  __typename?: 'PaymentGateway';
  /** Payment gateway name. */
  name: Scalars['String'];
  /** Payment gateway ID. */
  id: Scalars['ID'];
  /** Payment gateway client configuration. */
  config: Array<GatewayConfigLine>;
  /** Payment gateway supported currencies. */
  currencies: Array<Maybe<Scalars['String']>>;
};

/** Payment gateway client configuration key and value pair. */
export type GatewayConfigLine = {
  __typename?: 'GatewayConfigLine';
  /** Gateway config key. */
  field: Scalars['String'];
  /** Gateway config value for key. */
  value?: Maybe<Scalars['String']>;
};

/** Represents customers's geolocalization data. */
export type Geolocalization = {
  __typename?: 'Geolocalization';
  /** Country of the user acquired by his IP address. */
  country?: Maybe<CountryDisplay>;
};

export type AuthorizationKey = {
  __typename?: 'AuthorizationKey';
  /** Name of the authorization backend. */
  name: AuthorizationKeyType;
  /** Authorization key (client ID). */
  key: Scalars['String'];
};

/** An enumeration. */
export enum AuthorizationKeyType {
  Facebook = 'FACEBOOK',
  GoogleOauth2 = 'GOOGLE_OAUTH2'
}

/** Represents shop's domain. */
export type Domain = {
  __typename?: 'Domain';
  /** The host name of the domain. */
  host: Scalars['String'];
  /** Inform if SSL is enabled. */
  sslEnabled: Scalars['Boolean'];
  /** Shop's absolute URL. */
  url: Scalars['String'];
};

/** Represents shop's navigation menus. */
export type Navigation = {
  __typename?: 'Navigation';
  /** Main navigation bar. */
  main?: Maybe<Menu>;
  /** Secondary navigation bar. */
  secondary?: Maybe<Menu>;
};

export type ShopTranslation = Node & {
  __typename?: 'ShopTranslation';
  /** The ID of the object. */
  id: Scalars['ID'];
  headerText: Scalars['String'];
  description: Scalars['String'];
  /** Translation language. */
  language: LanguageDisplay;
};

/** Represents a recipient of email notifications send by Saleor, such as notifications about new orders. Notifications can be assigned to staff users or arbitrary email addresses. */
export type StaffNotificationRecipient = Node & {
  __typename?: 'StaffNotificationRecipient';
  /** Returns a user subscribed to email notifications. */
  user?: Maybe<User>;
  /** Determines if a notification active. */
  active?: Maybe<Scalars['Boolean']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Returns email address of a user subscribed to email notifications. */
  email?: Maybe<Scalars['String']>;
};

/** Represents user data. */
export type User = Node & ObjectWithMetadata & {
  __typename?: 'User';
  /** The ID of the object. */
  id: Scalars['ID'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  isStaff: Scalars['Boolean'];
  isActive: Scalars['Boolean'];
  /** A note about the customer. */
  note?: Maybe<Scalars['String']>;
  dateJoined: Scalars['DateTime'];
  defaultShippingAddress?: Maybe<Address>;
  defaultBillingAddress?: Maybe<Address>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of all user's addresses. */
  addresses?: Maybe<Array<Maybe<Address>>>;
  /** Returns the last open checkout of this user. */
  checkout?: Maybe<Checkout>;
  /** List of the user gift cards. */
  giftCards?: Maybe<GiftCardCountableConnection>;
  /** List of user's orders. */
  orders?: Maybe<OrderCountableConnection>;
  /**
   * List of user's permissions.
   * @deprecated Will be removed in Saleor 2.11.Use the `userPermissions` instead.
   */
  permissions?: Maybe<Array<Maybe<Permission>>>;
  /** List of user's permissions. */
  userPermissions?: Maybe<Array<Maybe<UserPermission>>>;
  /** List of user's permission groups. */
  permissionGroups?: Maybe<Array<Maybe<Group>>>;
  /** List of user's permission groups which user can manage. */
  editableGroups?: Maybe<Array<Maybe<Group>>>;
  avatar?: Maybe<Image>;
  /** List of events associated with the user. */
  events?: Maybe<Array<Maybe<CustomerEvent>>>;
  /** List of stored payment sources. */
  storedPaymentSources?: Maybe<Array<Maybe<PaymentSource>>>;
};


/** Represents user data. */
export type UserGiftCardsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Represents user data. */
export type UserOrdersArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Represents user data. */
export type UserAvatarArgs = {
  size?: Maybe<Scalars['Int']>;
};

/** Checkout object. */
export type Checkout = Node & ObjectWithMetadata & {
  __typename?: 'Checkout';
  created: Scalars['DateTime'];
  lastChange: Scalars['DateTime'];
  user?: Maybe<User>;
  quantity: Scalars['Int'];
  billingAddress?: Maybe<Address>;
  shippingAddress?: Maybe<Address>;
  shippingMethod?: Maybe<ShippingMethod>;
  note: Scalars['String'];
  discount?: Maybe<Money>;
  discountName?: Maybe<Scalars['String']>;
  translatedDiscountName?: Maybe<Scalars['String']>;
  voucherCode?: Maybe<Scalars['String']>;
  /** List of gift cards associated with this checkout. */
  giftCards?: Maybe<Array<Maybe<GiftCard>>>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** Shipping methods that can be used with this order. */
  availableShippingMethods: Array<Maybe<ShippingMethod>>;
  /** List of available payment gateways. */
  availablePaymentGateways: Array<PaymentGateway>;
  /** Email of a customer. */
  email: Scalars['String'];
  /** Returns True, if checkout requires shipping. */
  isShippingRequired: Scalars['Boolean'];
  /** A list of checkout lines, each containing information about an item in the checkout. */
  lines?: Maybe<Array<Maybe<CheckoutLine>>>;
  /** The price of the shipping, with all the taxes included. */
  shippingPrice?: Maybe<TaxedMoney>;
  /** The price of the checkout before shipping, with taxes included. */
  subtotalPrice?: Maybe<TaxedMoney>;
  /** The checkout's token. */
  token: Scalars['UUID'];
  /** The sum of the the checkout line prices, with all the taxes,shipping costs, and discounts included. */
  totalPrice?: Maybe<TaxedMoney>;
};

/** A gift card is a prepaid electronic payment card accepted in stores. They can be used during checkout by providing a valid gift card codes. */
export type GiftCard = Node & {
  __typename?: 'GiftCard';
  /** Gift card code. */
  code?: Maybe<Scalars['String']>;
  /** The customer who bought a gift card. */
  user?: Maybe<User>;
  created: Scalars['DateTime'];
  startDate: Scalars['Date'];
  endDate?: Maybe<Scalars['Date']>;
  lastUsedOn?: Maybe<Scalars['DateTime']>;
  isActive: Scalars['Boolean'];
  initialBalance?: Maybe<Money>;
  currentBalance?: Maybe<Money>;
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Code in format which allows displaying in a user interface. */
  displayCode?: Maybe<Scalars['String']>;
};

/** Represents an item in the checkout. */
export type CheckoutLine = Node & {
  __typename?: 'CheckoutLine';
  /** The ID of the object. */
  id: Scalars['ID'];
  variant: ProductVariant;
  quantity: Scalars['Int'];
  /** The sum of the checkout line price, taxes and discounts. */
  totalPrice?: Maybe<TaxedMoney>;
  /** Indicates whether the item need to be delivered. */
  requiresShipping?: Maybe<Scalars['Boolean']>;
};

export type GiftCardCountableConnection = {
  __typename?: 'GiftCardCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<GiftCardCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type GiftCardCountableEdge = {
  __typename?: 'GiftCardCountableEdge';
  /** The item at the end of the edge. */
  node: GiftCard;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type OrderCountableConnection = {
  __typename?: 'OrderCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<OrderCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type OrderCountableEdge = {
  __typename?: 'OrderCountableEdge';
  /** The item at the end of the edge. */
  node: Order;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

/** Represents an order in the shop. */
export type Order = Node & ObjectWithMetadata & {
  __typename?: 'Order';
  /** The ID of the object. */
  id: Scalars['ID'];
  created: Scalars['DateTime'];
  status: OrderStatus;
  user?: Maybe<User>;
  languageCode: Scalars['String'];
  trackingClientId: Scalars['String'];
  billingAddress?: Maybe<Address>;
  shippingAddress?: Maybe<Address>;
  shippingMethod?: Maybe<ShippingMethod>;
  shippingMethodName?: Maybe<Scalars['String']>;
  /** Total price of shipping. */
  shippingPrice?: Maybe<TaxedMoney>;
  token: Scalars['String'];
  voucher?: Maybe<Voucher>;
  /** List of user gift cards. */
  giftCards?: Maybe<Array<Maybe<GiftCard>>>;
  discount?: Maybe<Money>;
  discountName?: Maybe<Scalars['String']>;
  translatedDiscountName?: Maybe<Scalars['String']>;
  displayGrossPrices: Scalars['Boolean'];
  customerNote: Scalars['String'];
  weight?: Maybe<Weight>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of shipments for the order. */
  fulfillments: Array<Maybe<Fulfillment>>;
  /** List of order lines. */
  lines: Array<Maybe<OrderLine>>;
  /** List of actions that can be performed in the current state of an order. */
  actions: Array<Maybe<OrderAction>>;
  /** Shipping methods that can be used with this order. */
  availableShippingMethods?: Maybe<Array<Maybe<ShippingMethod>>>;
  /** List of order invoices. */
  invoices?: Maybe<Array<Maybe<Invoice>>>;
  /** User-friendly number of an order. */
  number?: Maybe<Scalars['String']>;
  /** Informs if an order is fully paid. */
  isPaid?: Maybe<Scalars['Boolean']>;
  /** Internal payment status. */
  paymentStatus?: Maybe<PaymentChargeStatusEnum>;
  /** User-friendly payment status. */
  paymentStatusDisplay?: Maybe<Scalars['String']>;
  /** List of payments for the order. */
  payments?: Maybe<Array<Maybe<Payment>>>;
  /** Total amount of the order. */
  total?: Maybe<TaxedMoney>;
  /** The sum of line prices not including shipping. */
  subtotal?: Maybe<TaxedMoney>;
  /** User-friendly order status. */
  statusDisplay?: Maybe<Scalars['String']>;
  /** Informs whether a draft order can be finalized(turned into a regular order). */
  canFinalize: Scalars['Boolean'];
  /** Amount authorized for the order. */
  totalAuthorized?: Maybe<Money>;
  /** Amount captured by payment. */
  totalCaptured?: Maybe<Money>;
  /** List of events associated with the order. */
  events?: Maybe<Array<Maybe<OrderEvent>>>;
  /** The difference between the paid and the order total amount. */
  totalBalance: Money;
  /** Email address of the customer. */
  userEmail?: Maybe<Scalars['String']>;
  /** Returns True, if order requires shipping. */
  isShippingRequired: Scalars['Boolean'];
};

/** An enumeration. */
export enum OrderStatus {
  /** Draft */
  Draft = 'DRAFT',
  /** Unfulfilled */
  Unfulfilled = 'UNFULFILLED',
  /** Partially fulfilled */
  PartiallyFulfilled = 'PARTIALLY_FULFILLED',
  /** Fulfilled */
  Fulfilled = 'FULFILLED',
  /** Canceled */
  Canceled = 'CANCELED'
}

/** Represents order fulfillment. */
export type Fulfillment = Node & ObjectWithMetadata & {
  __typename?: 'Fulfillment';
  /** The ID of the object. */
  id: Scalars['ID'];
  fulfillmentOrder: Scalars['Int'];
  status: FulfillmentStatus;
  trackingNumber: Scalars['String'];
  created: Scalars['DateTime'];
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** List of lines for the fulfillment. */
  lines?: Maybe<Array<Maybe<FulfillmentLine>>>;
  /** User-friendly fulfillment status. */
  statusDisplay?: Maybe<Scalars['String']>;
  /** Warehouse from fulfillment was fulfilled. */
  warehouse?: Maybe<Warehouse>;
};

/** An enumeration. */
export enum FulfillmentStatus {
  /** Fulfilled */
  Fulfilled = 'FULFILLED',
  /** Canceled */
  Canceled = 'CANCELED'
}

/** Represents line of the fulfillment. */
export type FulfillmentLine = Node & {
  __typename?: 'FulfillmentLine';
  /** The ID of the object. */
  id: Scalars['ID'];
  quantity: Scalars['Int'];
  orderLine?: Maybe<OrderLine>;
};

/** Represents order line of particular order. */
export type OrderLine = Node & {
  __typename?: 'OrderLine';
  /** The ID of the object. */
  id: Scalars['ID'];
  productName: Scalars['String'];
  variantName: Scalars['String'];
  productSku: Scalars['String'];
  isShippingRequired: Scalars['Boolean'];
  quantity: Scalars['Int'];
  quantityFulfilled: Scalars['Int'];
  taxRate: Scalars['Float'];
  digitalContentUrl?: Maybe<DigitalContentUrl>;
  /** The main thumbnail for the ordered product. */
  thumbnail?: Maybe<Image>;
  /** Price of the single item in the order line. */
  unitPrice?: Maybe<TaxedMoney>;
  /** Price of the order line. */
  totalPrice?: Maybe<TaxedMoney>;
  /** A purchased product variant. Note: this field may be null if the variant has been removed from stock at all. */
  variant?: Maybe<ProductVariant>;
  /** Product name in the customer's language */
  translatedProductName: Scalars['String'];
  /** Variant name in the customer's language */
  translatedVariantName: Scalars['String'];
  /** List of allocations across warehouses. */
  allocations?: Maybe<Array<Allocation>>;
};


/** Represents order line of particular order. */
export type OrderLineThumbnailArgs = {
  size?: Maybe<Scalars['Int']>;
};

/** Represents allocation. */
export type Allocation = Node & {
  __typename?: 'Allocation';
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Quantity allocated for orders. */
  quantity: Scalars['Int'];
  /** The warehouse were items were allocated. */
  warehouse: Warehouse;
};

export enum OrderAction {
  /** Represents the capture action. */
  Capture = 'CAPTURE',
  /** Represents a mark-as-paid action. */
  MarkAsPaid = 'MARK_AS_PAID',
  /** Represents a refund action. */
  Refund = 'REFUND',
  /** Represents a void action. */
  Void = 'VOID'
}

/** Represents an Invoice. */
export type Invoice = ObjectWithMetadata & Job & Node & {
  __typename?: 'Invoice';
  /** The ID of the object. */
  id: Scalars['ID'];
  /** List of public metadata items. Can be accessed without permissions. */
  metadata: Array<Maybe<MetadataItem>>;
  /** Job status. */
  status: JobStatusEnum;
  number?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  /** List of private metadata items.Requires proper staff permissions to access. */
  privateMetadata: Array<Maybe<MetadataItem>>;
  /**
   * List of privately stored metadata namespaces.
   * @deprecated Use the `privetaMetadata` field. This field will be removed after 2020-07-31.
   */
  privateMeta: Array<Maybe<MetaStore>>;
  /**
   * List of publicly stored metadata namespaces.
   * @deprecated Use the `metadata` field. This field will be removed after 2020-07-31.
   */
  meta: Array<Maybe<MetaStore>>;
  /** Created date time of job in ISO 8601 format. */
  createdAt: Scalars['DateTime'];
  /** Date time of job last update in ISO 8601 format. */
  updatedAt: Scalars['DateTime'];
  /** Job message. */
  message?: Maybe<Scalars['String']>;
  /** URL to download an invoice. */
  url?: Maybe<Scalars['String']>;
};

export type Job = {
  /** Job status. */
  status: JobStatusEnum;
  /** Created date time of job in ISO 8601 format. */
  createdAt: Scalars['DateTime'];
  /** Date time of job last update in ISO 8601 format. */
  updatedAt: Scalars['DateTime'];
  /** Job message. */
  message?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum JobStatusEnum {
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
  Deleted = 'DELETED'
}

/** An enumeration. */
export enum PaymentChargeStatusEnum {
  NotCharged = 'NOT_CHARGED',
  Pending = 'PENDING',
  PartiallyCharged = 'PARTIALLY_CHARGED',
  FullyCharged = 'FULLY_CHARGED',
  PartiallyRefunded = 'PARTIALLY_REFUNDED',
  FullyRefunded = 'FULLY_REFUNDED',
  Refused = 'REFUSED',
  Cancelled = 'CANCELLED'
}

/** Represents a payment of a given type. */
export type Payment = Node & {
  __typename?: 'Payment';
  /** The ID of the object. */
  id: Scalars['ID'];
  gateway: Scalars['String'];
  isActive: Scalars['Boolean'];
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  token: Scalars['String'];
  checkout?: Maybe<Checkout>;
  order?: Maybe<Order>;
  customerIpAddress?: Maybe<Scalars['String']>;
  /** Internal payment status. */
  chargeStatus: PaymentChargeStatusEnum;
  /** List of actions that can be performed in the current state of a payment. */
  actions: Array<Maybe<OrderAction>>;
  /** Total amount of the payment. */
  total?: Maybe<Money>;
  /** Total amount captured for this payment. */
  capturedAmount?: Maybe<Money>;
  /** List of all transactions within this payment. */
  transactions?: Maybe<Array<Maybe<Transaction>>>;
  /** Maximum amount of money that can be captured. */
  availableCaptureAmount?: Maybe<Money>;
  /** Maximum amount of money that can be refunded. */
  availableRefundAmount?: Maybe<Money>;
  /** The details of the card used for this payment. */
  creditCard?: Maybe<CreditCard>;
};

/** An object representing a single payment. */
export type Transaction = Node & {
  __typename?: 'Transaction';
  /** The ID of the object. */
  id: Scalars['ID'];
  created: Scalars['DateTime'];
  payment: Payment;
  token: Scalars['String'];
  kind: TransactionKind;
  isSuccess: Scalars['Boolean'];
  error?: Maybe<TransactionError>;
  /** Total amount of the transaction. */
  amount?: Maybe<Money>;
};

/** An enumeration. */
export enum TransactionKind {
  /** Authorization */
  Auth = 'AUTH',
  /** Pending */
  Pending = 'PENDING',
  /** Action to confirm */
  ActionToConfirm = 'ACTION_TO_CONFIRM',
  /** Refund */
  Refund = 'REFUND',
  /** Refund in progress */
  RefundOngoing = 'REFUND_ONGOING',
  /** Capture */
  Capture = 'CAPTURE',
  /** Void */
  Void = 'VOID',
  /** Confirm */
  Confirm = 'CONFIRM',
  /** Cancel */
  Cancel = 'CANCEL'
}

/** An enumeration. */
export enum TransactionError {
  /** incorrect_number */
  TransactionerrorIncorrectNumber = 'TRANSACTIONERROR_INCORRECT_NUMBER',
  /** invalid_number */
  TransactionerrorInvalidNumber = 'TRANSACTIONERROR_INVALID_NUMBER',
  /** incorrect_cvv */
  TransactionerrorIncorrectCvv = 'TRANSACTIONERROR_INCORRECT_CVV',
  /** invalid_cvv */
  TransactionerrorInvalidCvv = 'TRANSACTIONERROR_INVALID_CVV',
  /** incorrect_zip */
  TransactionerrorIncorrectZip = 'TRANSACTIONERROR_INCORRECT_ZIP',
  /** incorrect_address */
  TransactionerrorIncorrectAddress = 'TRANSACTIONERROR_INCORRECT_ADDRESS',
  /** invalid_expiry_date */
  TransactionerrorInvalidExpiryDate = 'TRANSACTIONERROR_INVALID_EXPIRY_DATE',
  /** expired */
  TransactionerrorExpired = 'TRANSACTIONERROR_EXPIRED',
  /** processing_error */
  TransactionerrorProcessingError = 'TRANSACTIONERROR_PROCESSING_ERROR',
  /** declined */
  TransactionerrorDeclined = 'TRANSACTIONERROR_DECLINED'
}

export type CreditCard = {
  __typename?: 'CreditCard';
  /** Card brand. */
  brand: Scalars['String'];
  /** First 4 digits of the card number. */
  firstDigits?: Maybe<Scalars['String']>;
  /** Last 4 digits of the card number. */
  lastDigits: Scalars['String'];
  /** Two-digit number representing the card’s expiration month. */
  expMonth?: Maybe<Scalars['Int']>;
  /** Four-digit number representing the card’s expiration year. */
  expYear?: Maybe<Scalars['Int']>;
};

/** History log of the order. */
export type OrderEvent = Node & {
  __typename?: 'OrderEvent';
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Date when event happened at in ISO 8601 format. */
  date?: Maybe<Scalars['DateTime']>;
  /** Order event type. */
  type?: Maybe<OrderEventsEnum>;
  /** User who performed the action. */
  user?: Maybe<User>;
  /** Content of the event. */
  message?: Maybe<Scalars['String']>;
  /** Email of the customer. */
  email?: Maybe<Scalars['String']>;
  /** Type of an email sent to the customer. */
  emailType?: Maybe<OrderEventsEmailsEnum>;
  /** Amount of money. */
  amount?: Maybe<Scalars['Float']>;
  /** The payment ID from the payment gateway. */
  paymentId?: Maybe<Scalars['String']>;
  /** The payment gateway of the payment. */
  paymentGateway?: Maybe<Scalars['String']>;
  /** Number of items. */
  quantity?: Maybe<Scalars['Int']>;
  /** Composed ID of the Fulfillment. */
  composedId?: Maybe<Scalars['String']>;
  /** User-friendly number of an order. */
  orderNumber?: Maybe<Scalars['String']>;
  /** Number of an invoice related to the order. */
  invoiceNumber?: Maybe<Scalars['String']>;
  /** List of oversold lines names. */
  oversoldItems?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The concerned lines. */
  lines?: Maybe<Array<Maybe<OrderEventOrderLineObject>>>;
  /** The lines fulfilled. */
  fulfilledItems?: Maybe<Array<Maybe<FulfillmentLine>>>;
  /** The warehouse were items were restocked. */
  warehouse?: Maybe<Warehouse>;
};

/** An enumeration. */
export enum OrderEventsEnum {
  DraftCreated = 'DRAFT_CREATED',
  DraftAddedProducts = 'DRAFT_ADDED_PRODUCTS',
  DraftRemovedProducts = 'DRAFT_REMOVED_PRODUCTS',
  Placed = 'PLACED',
  PlacedFromDraft = 'PLACED_FROM_DRAFT',
  OversoldItems = 'OVERSOLD_ITEMS',
  Canceled = 'CANCELED',
  OrderMarkedAsPaid = 'ORDER_MARKED_AS_PAID',
  OrderFullyPaid = 'ORDER_FULLY_PAID',
  UpdatedAddress = 'UPDATED_ADDRESS',
  EmailSent = 'EMAIL_SENT',
  PaymentAuthorized = 'PAYMENT_AUTHORIZED',
  PaymentCaptured = 'PAYMENT_CAPTURED',
  ExternalServiceNotification = 'EXTERNAL_SERVICE_NOTIFICATION',
  PaymentRefunded = 'PAYMENT_REFUNDED',
  PaymentVoided = 'PAYMENT_VOIDED',
  PaymentFailed = 'PAYMENT_FAILED',
  InvoiceRequested = 'INVOICE_REQUESTED',
  InvoiceGenerated = 'INVOICE_GENERATED',
  InvoiceUpdated = 'INVOICE_UPDATED',
  InvoiceSent = 'INVOICE_SENT',
  FulfillmentCanceled = 'FULFILLMENT_CANCELED',
  FulfillmentRestockedItems = 'FULFILLMENT_RESTOCKED_ITEMS',
  FulfillmentFulfilledItems = 'FULFILLMENT_FULFILLED_ITEMS',
  TrackingUpdated = 'TRACKING_UPDATED',
  NoteAdded = 'NOTE_ADDED',
  Other = 'OTHER'
}

/** An enumeration. */
export enum OrderEventsEmailsEnum {
  PaymentConfirmation = 'PAYMENT_CONFIRMATION',
  ShippingConfirmation = 'SHIPPING_CONFIRMATION',
  TrackingUpdated = 'TRACKING_UPDATED',
  OrderConfirmation = 'ORDER_CONFIRMATION',
  OrderCancel = 'ORDER_CANCEL',
  OrderRefund = 'ORDER_REFUND',
  FulfillmentConfirmation = 'FULFILLMENT_CONFIRMATION',
  DigitalLinks = 'DIGITAL_LINKS'
}

export type OrderEventOrderLineObject = {
  __typename?: 'OrderEventOrderLineObject';
  /** The variant quantity. */
  quantity?: Maybe<Scalars['Int']>;
  /** The order line. */
  orderLine?: Maybe<OrderLine>;
  /** The variant name. */
  itemName?: Maybe<Scalars['String']>;
};

export type UserPermission = {
  __typename?: 'UserPermission';
  /** Internal code for permission. */
  code: PermissionEnum;
  /** Describe action(s) allowed to do by permission. */
  name: Scalars['String'];
  /** List of user permission groups which contains this permission. */
  sourcePermissionGroups?: Maybe<Array<Group>>;
};


export type UserPermissionSourcePermissionGroupsArgs = {
  userId: Scalars['ID'];
};

/** Represents permission group data. */
export type Group = Node & {
  __typename?: 'Group';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** List of group permissions */
  permissions?: Maybe<Array<Maybe<Permission>>>;
  /** List of group users */
  users?: Maybe<Array<Maybe<User>>>;
  /** True, if the currently authenticated user has rights to manage a group. */
  userCanManage: Scalars['Boolean'];
};

/** History log of the customer. */
export type CustomerEvent = Node & {
  __typename?: 'CustomerEvent';
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Date when event happened at in ISO 8601 format. */
  date?: Maybe<Scalars['DateTime']>;
  /** Customer event type. */
  type?: Maybe<CustomerEventsEnum>;
  /** User who performed the action. */
  user?: Maybe<User>;
  /** Content of the event. */
  message?: Maybe<Scalars['String']>;
  /** Number of objects concerned by the event. */
  count?: Maybe<Scalars['Int']>;
  /** The concerned order. */
  order?: Maybe<Order>;
  /** The concerned order line. */
  orderLine?: Maybe<OrderLine>;
};

/** An enumeration. */
export enum CustomerEventsEnum {
  AccountCreated = 'ACCOUNT_CREATED',
  PasswordResetLinkSent = 'PASSWORD_RESET_LINK_SENT',
  PasswordReset = 'PASSWORD_RESET',
  EmailChangedRequest = 'EMAIL_CHANGED_REQUEST',
  PasswordChanged = 'PASSWORD_CHANGED',
  EmailChanged = 'EMAIL_CHANGED',
  PlacedOrder = 'PLACED_ORDER',
  NoteAddedToOrder = 'NOTE_ADDED_TO_ORDER',
  DigitalLinkDownloaded = 'DIGITAL_LINK_DOWNLOADED',
  CustomerDeleted = 'CUSTOMER_DELETED',
  NameAssigned = 'NAME_ASSIGNED',
  EmailAssigned = 'EMAIL_ASSIGNED',
  NoteAdded = 'NOTE_ADDED'
}

/** Represents a payment source stored for user in payment gateway, such as credit card. */
export type PaymentSource = {
  __typename?: 'PaymentSource';
  /** Payment gateway name. */
  gateway: Scalars['String'];
  /** Stored credit card details if available. */
  creditCardInfo?: Maybe<CreditCard>;
};

export type DigitalContentCountableConnection = {
  __typename?: 'DigitalContentCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<DigitalContentCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type DigitalContentCountableEdge = {
  __typename?: 'DigitalContentCountableEdge';
  /** The item at the end of the edge. */
  node: DigitalContent;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type AttributeSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort attributes by the selected field. */
  field: AttributeSortField;
};

export enum AttributeSortField {
  /** Sort attributes by name */
  Name = 'NAME',
  /** Sort attributes by slug */
  Slug = 'SLUG',
  /** Sort attributes by the value required flag */
  ValueRequired = 'VALUE_REQUIRED',
  /** Sort attributes by the variant only flag */
  IsVariantOnly = 'IS_VARIANT_ONLY',
  /** Sort attributes by visibility in the storefront */
  VisibleInStorefront = 'VISIBLE_IN_STOREFRONT',
  /** Sort attributes by the filterable in storefront flag */
  FilterableInStorefront = 'FILTERABLE_IN_STOREFRONT',
  /** Sort attributes by the filterable in dashboard flag */
  FilterableInDashboard = 'FILTERABLE_IN_DASHBOARD',
  /** Sort attributes by their position in storefront */
  StorefrontSearchPosition = 'STOREFRONT_SEARCH_POSITION',
  /** Sort attributes based on whether they can be displayed or not in a product grid. */
  AvailableInGrid = 'AVAILABLE_IN_GRID'
}

export type CategoryFilterInput = {
  search?: Maybe<Scalars['String']>;
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type CategorySortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort categories by the selected field. */
  field: CategorySortField;
};

export enum CategorySortField {
  /** Sort categories by name. */
  Name = 'NAME',
  /** Sort categories by product count. */
  ProductCount = 'PRODUCT_COUNT',
  /** Sort categories by subcategory count. */
  SubcategoryCount = 'SUBCATEGORY_COUNT'
}

export type CollectionFilterInput = {
  published?: Maybe<CollectionPublished>;
  search?: Maybe<Scalars['String']>;
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export enum CollectionPublished {
  Published = 'PUBLISHED',
  Hidden = 'HIDDEN'
}

export type CollectionSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort collections by the selected field. */
  field: CollectionSortField;
};

export enum CollectionSortField {
  /** Sort collections by name. */
  Name = 'NAME',
  /** Sort collections by availability. */
  Availability = 'AVAILABILITY',
  /** Sort collections by product count. */
  ProductCount = 'PRODUCT_COUNT',
  /** Sort collections by publication date. */
  PublicationDate = 'PUBLICATION_DATE'
}

export type ProductTypeFilterInput = {
  search?: Maybe<Scalars['String']>;
  configurable?: Maybe<ProductTypeConfigurable>;
  productType?: Maybe<ProductTypeEnum>;
  ids?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export enum ProductTypeConfigurable {
  Configurable = 'CONFIGURABLE',
  Simple = 'SIMPLE'
}

export enum ProductTypeEnum {
  Digital = 'DIGITAL',
  Shippable = 'SHIPPABLE'
}

export type ProductTypeSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort product types by the selected field. */
  field: ProductTypeSortField;
};

export enum ProductTypeSortField {
  /** Sort products by name. */
  Name = 'NAME',
  /** Sort products by type. */
  Digital = 'DIGITAL',
  /** Sort products by shipping. */
  ShippingRequired = 'SHIPPING_REQUIRED'
}

export type ProductVariantCountableConnection = {
  __typename?: 'ProductVariantCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<ProductVariantCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ProductVariantCountableEdge = {
  __typename?: 'ProductVariantCountableEdge';
  /** The item at the end of the edge. */
  node: ProductVariant;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type ProductVariantFilterInput = {
  search?: Maybe<Scalars['String']>;
  sku?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type PaymentCountableConnection = {
  __typename?: 'PaymentCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<PaymentCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type PaymentCountableEdge = {
  __typename?: 'PaymentCountableEdge';
  /** The item at the end of the edge. */
  node: Payment;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type PageCountableConnection = {
  __typename?: 'PageCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<PageCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type PageCountableEdge = {
  __typename?: 'PageCountableEdge';
  /** The item at the end of the edge. */
  node: Page;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type PageSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort pages by the selected field. */
  field: PageSortField;
};

export enum PageSortField {
  /** Sort pages by title. */
  Title = 'TITLE',
  /** Sort pages by slug. */
  Slug = 'SLUG',
  /** Sort pages by visibility. */
  Visibility = 'VISIBILITY',
  /** Sort pages by creation date. */
  CreationDate = 'CREATION_DATE',
  /** Sort pages by publication date. */
  PublicationDate = 'PUBLICATION_DATE'
}

export type PageFilterInput = {
  search?: Maybe<Scalars['String']>;
};

export type OrderEventCountableConnection = {
  __typename?: 'OrderEventCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<OrderEventCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type OrderEventCountableEdge = {
  __typename?: 'OrderEventCountableEdge';
  /** The item at the end of the edge. */
  node: OrderEvent;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type OrderSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort orders by the selected field. */
  field: OrderSortField;
};

export enum OrderSortField {
  /** Sort orders by number. */
  Number = 'NUMBER',
  /** Sort orders by creation date. */
  CreationDate = 'CREATION_DATE',
  /** Sort orders by customer. */
  Customer = 'CUSTOMER',
  /** Sort orders by payment. */
  Payment = 'PAYMENT',
  /** Sort orders by fulfillment status. */
  FulfillmentStatus = 'FULFILLMENT_STATUS',
  /** Sort orders by total. */
  Total = 'TOTAL'
}

export type OrderFilterInput = {
  paymentStatus?: Maybe<Array<Maybe<PaymentChargeStatusEnum>>>;
  status?: Maybe<Array<Maybe<OrderStatusFilter>>>;
  customer?: Maybe<Scalars['String']>;
  created?: Maybe<DateRangeInput>;
  search?: Maybe<Scalars['String']>;
};

export enum OrderStatusFilter {
  ReadyToFulfill = 'READY_TO_FULFILL',
  ReadyToCapture = 'READY_TO_CAPTURE',
  Unfulfilled = 'UNFULFILLED',
  PartiallyFulfilled = 'PARTIALLY_FULFILLED',
  Fulfilled = 'FULFILLED',
  Canceled = 'CANCELED'
}

export type DateRangeInput = {
  /** Start date. */
  gte?: Maybe<Scalars['Date']>;
  /** End date. */
  lte?: Maybe<Scalars['Date']>;
};

export type OrderDraftFilterInput = {
  customer?: Maybe<Scalars['String']>;
  created?: Maybe<DateRangeInput>;
  search?: Maybe<Scalars['String']>;
};

export type MenuCountableConnection = {
  __typename?: 'MenuCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<MenuCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type MenuCountableEdge = {
  __typename?: 'MenuCountableEdge';
  /** The item at the end of the edge. */
  node: Menu;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type MenuSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort menus by the selected field. */
  field: MenuSortField;
};

export enum MenuSortField {
  /** Sort menus by name. */
  Name = 'NAME',
  /** Sort menus by items count. */
  ItemsCount = 'ITEMS_COUNT'
}

export type MenuFilterInput = {
  search?: Maybe<Scalars['String']>;
  slug?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type MenuItemCountableConnection = {
  __typename?: 'MenuItemCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<MenuItemCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type MenuItemCountableEdge = {
  __typename?: 'MenuItemCountableEdge';
  /** The item at the end of the edge. */
  node: MenuItem;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type MenuItemSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort menu items by the selected field. */
  field: MenuItemsSortField;
};

export enum MenuItemsSortField {
  /** Sort menu items by name. */
  Name = 'NAME'
}

export type MenuItemFilterInput = {
  search?: Maybe<Scalars['String']>;
};

/** Plugin. */
export type Plugin = Node & {
  __typename?: 'Plugin';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  active: Scalars['Boolean'];
  configuration?: Maybe<Array<Maybe<ConfigurationItem>>>;
};

/** Stores information about a single configuration field. */
export type ConfigurationItem = {
  __typename?: 'ConfigurationItem';
  /** Name of the field. */
  name: Scalars['String'];
  /** Current value of the field. */
  value?: Maybe<Scalars['String']>;
  /** Type of the field. */
  type?: Maybe<ConfigurationTypeFieldEnum>;
  /** Help text for the field. */
  helpText?: Maybe<Scalars['String']>;
  /** Label for the field. */
  label?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum ConfigurationTypeFieldEnum {
  String = 'STRING',
  Boolean = 'BOOLEAN',
  Secret = 'SECRET',
  Password = 'PASSWORD',
  Secretmultiline = 'SECRETMULTILINE'
}

export type PluginCountableConnection = {
  __typename?: 'PluginCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<PluginCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type PluginCountableEdge = {
  __typename?: 'PluginCountableEdge';
  /** The item at the end of the edge. */
  node: Plugin;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type PluginFilterInput = {
  active?: Maybe<Scalars['Boolean']>;
  search?: Maybe<Scalars['String']>;
};

export type PluginSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort plugins by the selected field. */
  field: PluginSortField;
};

export enum PluginSortField {
  Name = 'NAME',
  IsActive = 'IS_ACTIVE'
}

export type SaleCountableConnection = {
  __typename?: 'SaleCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<SaleCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type SaleCountableEdge = {
  __typename?: 'SaleCountableEdge';
  /** The item at the end of the edge. */
  node: Sale;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type SaleFilterInput = {
  status?: Maybe<Array<Maybe<DiscountStatusEnum>>>;
  saleType?: Maybe<DiscountValueTypeEnum>;
  started?: Maybe<DateTimeRangeInput>;
  search?: Maybe<Scalars['String']>;
};

export enum DiscountStatusEnum {
  Active = 'ACTIVE',
  Expired = 'EXPIRED',
  Scheduled = 'SCHEDULED'
}

export type DateTimeRangeInput = {
  /** Start date. */
  gte?: Maybe<Scalars['DateTime']>;
  /** End date. */
  lte?: Maybe<Scalars['DateTime']>;
};

export type SaleSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort sales by the selected field. */
  field: SaleSortField;
};

export enum SaleSortField {
  /** Sort sales by name. */
  Name = 'NAME',
  /** Sort sales by start date. */
  StartDate = 'START_DATE',
  /** Sort sales by end date. */
  EndDate = 'END_DATE',
  /** Sort sales by value. */
  Value = 'VALUE',
  /** Sort sales by type. */
  Type = 'TYPE'
}

export type VoucherCountableConnection = {
  __typename?: 'VoucherCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<VoucherCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type VoucherCountableEdge = {
  __typename?: 'VoucherCountableEdge';
  /** The item at the end of the edge. */
  node: Voucher;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type VoucherFilterInput = {
  status?: Maybe<Array<Maybe<DiscountStatusEnum>>>;
  timesUsed?: Maybe<IntRangeInput>;
  discountType?: Maybe<Array<Maybe<VoucherDiscountType>>>;
  started?: Maybe<DateTimeRangeInput>;
  search?: Maybe<Scalars['String']>;
};

export enum VoucherDiscountType {
  Fixed = 'FIXED',
  Percentage = 'PERCENTAGE',
  Shipping = 'SHIPPING'
}

export type VoucherSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort vouchers by the selected field. */
  field: VoucherSortField;
};

export enum VoucherSortField {
  /** Sort vouchers by code. */
  Code = 'CODE',
  /** Sort vouchers by start date. */
  StartDate = 'START_DATE',
  /** Sort vouchers by end date. */
  EndDate = 'END_DATE',
  /** Sort vouchers by value. */
  Value = 'VALUE',
  /** Sort vouchers by type. */
  Type = 'TYPE',
  /** Sort vouchers by usage limit. */
  UsageLimit = 'USAGE_LIMIT',
  /** Sort vouchers by minimum spent amount. */
  MinimumSpentAmount = 'MINIMUM_SPENT_AMOUNT'
}

/** Represents a job data of exported file. */
export type ExportFile = Node & Job & {
  __typename?: 'ExportFile';
  /** The ID of the object. */
  id: Scalars['ID'];
  user?: Maybe<User>;
  app?: Maybe<App>;
  /** Job status. */
  status: JobStatusEnum;
  /** Created date time of job in ISO 8601 format. */
  createdAt: Scalars['DateTime'];
  /** Date time of job last update in ISO 8601 format. */
  updatedAt: Scalars['DateTime'];
  /** Job message. */
  message?: Maybe<Scalars['String']>;
  /** The URL of field to download. */
  url?: Maybe<Scalars['String']>;
  /** List of events associated with the export. */
  events?: Maybe<Array<ExportEvent>>;
};

/** History log of export file. */
export type ExportEvent = Node & {
  __typename?: 'ExportEvent';
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Date when event happened at in ISO 8601 format. */
  date: Scalars['DateTime'];
  /** Export event type. */
  type: ExportEventsEnum;
  /** User who performed the action. */
  user?: Maybe<User>;
  /** App which performed the action. */
  app?: Maybe<App>;
  /** Content of the event. */
  message: Scalars['String'];
};

/** An enumeration. */
export enum ExportEventsEnum {
  ExportPending = 'EXPORT_PENDING',
  ExportSuccess = 'EXPORT_SUCCESS',
  ExportFailed = 'EXPORT_FAILED',
  ExportDeleted = 'EXPORT_DELETED',
  ExportedFileSent = 'EXPORTED_FILE_SENT',
  ExportFailedInfoSent = 'EXPORT_FAILED_INFO_SENT'
}

export type ExportFileCountableConnection = {
  __typename?: 'ExportFileCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<ExportFileCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ExportFileCountableEdge = {
  __typename?: 'ExportFileCountableEdge';
  /** The item at the end of the edge. */
  node: ExportFile;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type ExportFileFilterInput = {
  createdAt?: Maybe<DateTimeRangeInput>;
  updatedAt?: Maybe<DateTimeRangeInput>;
  status?: Maybe<JobStatusEnum>;
  user?: Maybe<Scalars['String']>;
  app?: Maybe<Scalars['String']>;
};

export type ExportFileSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort export file by the selected field. */
  field: ExportFileSortField;
};

export enum ExportFileSortField {
  /** Sort export file by status. */
  Status = 'STATUS',
  /** Sort export file by created at. */
  CreatedAt = 'CREATED_AT',
  /** Sort export file by updated at. */
  UpdatedAt = 'UPDATED_AT'
}

export type CheckoutCountableConnection = {
  __typename?: 'CheckoutCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<CheckoutCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type CheckoutCountableEdge = {
  __typename?: 'CheckoutCountableEdge';
  /** The item at the end of the edge. */
  node: Checkout;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type CheckoutLineCountableConnection = {
  __typename?: 'CheckoutLineCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<CheckoutLineCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type CheckoutLineCountableEdge = {
  __typename?: 'CheckoutLineCountableEdge';
  /** The item at the end of the edge. */
  node: CheckoutLine;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

/** Represents ongoing installation of app. */
export type AppInstallation = Node & Job & {
  __typename?: 'AppInstallation';
  appName: Scalars['String'];
  manifestUrl: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Job status. */
  status: JobStatusEnum;
  /** Created date time of job in ISO 8601 format. */
  createdAt: Scalars['DateTime'];
  /** Date time of job last update in ISO 8601 format. */
  updatedAt: Scalars['DateTime'];
  /** Job message. */
  message?: Maybe<Scalars['String']>;
};

export type AppCountableConnection = {
  __typename?: 'AppCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<AppCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type AppCountableEdge = {
  __typename?: 'AppCountableEdge';
  /** The item at the end of the edge. */
  node: App;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type AppFilterInput = {
  search?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  type?: Maybe<AppTypeEnum>;
};

export type AppSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort apps by the selected field. */
  field: AppSortField;
};

export enum AppSortField {
  /** Sort apps by name. */
  Name = 'NAME',
  /** Sort apps by creation date. */
  CreationDate = 'CREATION_DATE'
}

export type AddressValidationData = {
  __typename?: 'AddressValidationData';
  countryCode?: Maybe<Scalars['String']>;
  countryName?: Maybe<Scalars['String']>;
  addressFormat?: Maybe<Scalars['String']>;
  addressLatinFormat?: Maybe<Scalars['String']>;
  allowedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
  requiredFields?: Maybe<Array<Maybe<Scalars['String']>>>;
  upperFields?: Maybe<Array<Maybe<Scalars['String']>>>;
  countryAreaType?: Maybe<Scalars['String']>;
  countryAreaChoices?: Maybe<Array<Maybe<ChoiceValue>>>;
  cityType?: Maybe<Scalars['String']>;
  cityChoices?: Maybe<Array<Maybe<ChoiceValue>>>;
  cityAreaType?: Maybe<Scalars['String']>;
  cityAreaChoices?: Maybe<Array<Maybe<ChoiceValue>>>;
  postalCodeType?: Maybe<Scalars['String']>;
  postalCodeMatchers?: Maybe<Array<Maybe<Scalars['String']>>>;
  postalCodeExamples?: Maybe<Array<Maybe<Scalars['String']>>>;
  postalCodePrefix?: Maybe<Scalars['String']>;
};

export type ChoiceValue = {
  __typename?: 'ChoiceValue';
  raw?: Maybe<Scalars['String']>;
  verbose?: Maybe<Scalars['String']>;
};

export type UserCountableConnection = {
  __typename?: 'UserCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<UserCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type UserCountableEdge = {
  __typename?: 'UserCountableEdge';
  /** The item at the end of the edge. */
  node: User;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type CustomerFilterInput = {
  dateJoined?: Maybe<DateRangeInput>;
  moneySpent?: Maybe<PriceRangeInput>;
  numberOfOrders?: Maybe<IntRangeInput>;
  placedOrders?: Maybe<DateRangeInput>;
  search?: Maybe<Scalars['String']>;
};

export type UserSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort users by the selected field. */
  field: UserSortField;
};

export enum UserSortField {
  /** Sort users by first name. */
  FirstName = 'FIRST_NAME',
  /** Sort users by last name. */
  LastName = 'LAST_NAME',
  /** Sort users by email. */
  Email = 'EMAIL',
  /** Sort users by order count. */
  OrderCount = 'ORDER_COUNT'
}

export type GroupCountableConnection = {
  __typename?: 'GroupCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<GroupCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type GroupCountableEdge = {
  __typename?: 'GroupCountableEdge';
  /** The item at the end of the edge. */
  node: Group;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type PermissionGroupFilterInput = {
  search?: Maybe<Scalars['String']>;
};

export type PermissionGroupSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort permission group by the selected field. */
  field: PermissionGroupSortField;
};

export enum PermissionGroupSortField {
  /** Sort permission group accounts by name. */
  Name = 'NAME'
}

export type StaffUserInput = {
  status?: Maybe<StaffMemberStatus>;
  search?: Maybe<Scalars['String']>;
};

export enum StaffMemberStatus {
  Active = 'ACTIVE',
  Deactivated = 'DEACTIVATED'
}

export type ServiceAccountCountableConnection = {
  __typename?: 'ServiceAccountCountableConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  edges: Array<ServiceAccountCountableEdge>;
  /** A total count of items in the collection. */
  totalCount?: Maybe<Scalars['Int']>;
};

export type ServiceAccountCountableEdge = {
  __typename?: 'ServiceAccountCountableEdge';
  /** The item at the end of the edge. */
  node: ServiceAccount;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export type ServiceAccountFilterInput = {
  search?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
};

export type ServiceAccountSortingInput = {
  /** Specifies the direction in which to sort products. */
  direction: OrderDirection;
  /** Sort service accounts by the selected field. */
  field: ServiceAccountSortField;
};

export enum ServiceAccountSortField {
  /** Sort service accounts by name. */
  Name = 'NAME',
  /** Sort service accounts by creation date. */
  CreationDate = 'CREATION_DATE'
}

export type _Entity = Address | User | Group | ServiceAccount | App | ProductVariant | Product | ProductType | Collection | Category | ProductImage;


export type _Service = {
  __typename?: '_Service';
  sdl?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a new webhook subscription. */
  webhookCreate?: Maybe<WebhookCreate>;
  /** Deletes a webhook subscription. */
  webhookDelete?: Maybe<WebhookDelete>;
  /** Updates a webhook subscription. */
  webhookUpdate?: Maybe<WebhookUpdate>;
  /** Creates new warehouse. */
  createWarehouse?: Maybe<WarehouseCreate>;
  /** Updates given warehouse. */
  updateWarehouse?: Maybe<WarehouseUpdate>;
  /** Deletes selected warehouse. */
  deleteWarehouse?: Maybe<WarehouseDelete>;
  /** Add shipping zone to given warehouse. */
  assignWarehouseShippingZone?: Maybe<WarehouseShippingZoneAssign>;
  /** Remove shipping zone from given warehouse. */
  unassignWarehouseShippingZone?: Maybe<WarehouseShippingZoneUnassign>;
  /** Adds an authorization key. */
  authorizationKeyAdd?: Maybe<AuthorizationKeyAdd>;
  /** Deletes an authorization key. */
  authorizationKeyDelete?: Maybe<AuthorizationKeyDelete>;
  /** Creates a new staff notification recipient. */
  staffNotificationRecipientCreate?: Maybe<StaffNotificationRecipientCreate>;
  /** Updates a staff notification recipient. */
  staffNotificationRecipientUpdate?: Maybe<StaffNotificationRecipientUpdate>;
  /** Delete staff notification recipient. */
  staffNotificationRecipientDelete?: Maybe<StaffNotificationRecipientDelete>;
  /** Updates homepage collection of the shop. */
  homepageCollectionUpdate?: Maybe<HomepageCollectionUpdate>;
  /** Updates site domain of the shop. */
  shopDomainUpdate?: Maybe<ShopDomainUpdate>;
  /** Updates shop settings. */
  shopSettingsUpdate?: Maybe<ShopSettingsUpdate>;
  /** Fetch tax rates. */
  shopFetchTaxRates?: Maybe<ShopFetchTaxRates>;
  /** Creates/Updates translations for Shop Settings. */
  shopSettingsTranslate?: Maybe<ShopSettingsTranslate>;
  /** Update the shop's address. If the `null` value is passed, the currently selected address will be deleted. */
  shopAddressUpdate?: Maybe<ShopAddressUpdate>;
  /** Creates a new shipping price. */
  shippingPriceCreate?: Maybe<ShippingPriceCreate>;
  /** Deletes a shipping price. */
  shippingPriceDelete?: Maybe<ShippingPriceDelete>;
  /** Deletes shipping prices. */
  shippingPriceBulkDelete?: Maybe<ShippingPriceBulkDelete>;
  /** Updates a new shipping price. */
  shippingPriceUpdate?: Maybe<ShippingPriceUpdate>;
  /** Creates/Updates translations for shipping method. */
  shippingPriceTranslate?: Maybe<ShippingPriceTranslate>;
  /** Creates a new shipping zone. */
  shippingZoneCreate?: Maybe<ShippingZoneCreate>;
  /** Deletes a shipping zone. */
  shippingZoneDelete?: Maybe<ShippingZoneDelete>;
  /** Deletes shipping zones. */
  shippingZoneBulkDelete?: Maybe<ShippingZoneBulkDelete>;
  /** Updates a new shipping zone. */
  shippingZoneUpdate?: Maybe<ShippingZoneUpdate>;
  /** Creates an attribute. */
  attributeCreate?: Maybe<AttributeCreate>;
  /** Deletes an attribute. */
  attributeDelete?: Maybe<AttributeDelete>;
  /** Deletes attributes. */
  attributeBulkDelete?: Maybe<AttributeBulkDelete>;
  /** Assign attributes to a given product type. */
  attributeAssign?: Maybe<AttributeAssign>;
  /** Un-assign attributes from a given product type. */
  attributeUnassign?: Maybe<AttributeUnassign>;
  /** Updates attribute. */
  attributeUpdate?: Maybe<AttributeUpdate>;
  /** Creates/Updates translations for attribute. */
  attributeTranslate?: Maybe<AttributeTranslate>;
  /**
   * Update public metadata for attribute.
   * @deprecated Use the `updateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  attributeUpdateMetadata?: Maybe<AttributeUpdateMeta>;
  /**
   * Clears public metadata item for attribute.
   * @deprecated Use the `deleteMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  attributeClearMetadata?: Maybe<AttributeClearMeta>;
  /**
   * Update public metadata for attribute.
   * @deprecated Use the `updatePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  attributeUpdatePrivateMetadata?: Maybe<AttributeUpdatePrivateMeta>;
  /**
   * Clears public metadata item for attribute.
   * @deprecated Use the `deletePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  attributeClearPrivateMetadata?: Maybe<AttributeClearPrivateMeta>;
  /** Creates a value for an attribute. */
  attributeValueCreate?: Maybe<AttributeValueCreate>;
  /** Deletes a value of an attribute. */
  attributeValueDelete?: Maybe<AttributeValueDelete>;
  /** Deletes values of attributes. */
  attributeValueBulkDelete?: Maybe<AttributeValueBulkDelete>;
  /** Updates value of an attribute. */
  attributeValueUpdate?: Maybe<AttributeValueUpdate>;
  /** Creates/Updates translations for attribute value. */
  attributeValueTranslate?: Maybe<AttributeValueTranslate>;
  /** Reorder the values of an attribute. */
  attributeReorderValues?: Maybe<AttributeReorderValues>;
  /** Creates a new category. */
  categoryCreate?: Maybe<CategoryCreate>;
  /** Deletes a category. */
  categoryDelete?: Maybe<CategoryDelete>;
  /** Deletes categories. */
  categoryBulkDelete?: Maybe<CategoryBulkDelete>;
  /** Updates a category. */
  categoryUpdate?: Maybe<CategoryUpdate>;
  /** Creates/Updates translations for Category. */
  categoryTranslate?: Maybe<CategoryTranslate>;
  /**
   * Update public metadata for category.
   * @deprecated Use the `updateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  categoryUpdateMetadata?: Maybe<CategoryUpdateMeta>;
  /**
   * Clears public metadata for category.
   * @deprecated Use the `deleteMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  categoryClearMetadata?: Maybe<CategoryClearMeta>;
  /**
   * Update private metadata for category.
   * @deprecated Use the `updatePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  categoryUpdatePrivateMetadata?: Maybe<CategoryUpdatePrivateMeta>;
  /**
   * Clears private metadata for category.
   * @deprecated Use the `deletePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  categoryClearPrivateMetadata?: Maybe<CategoryClearPrivateMeta>;
  /** Adds products to a collection. */
  collectionAddProducts?: Maybe<CollectionAddProducts>;
  /** Creates a new collection. */
  collectionCreate?: Maybe<CollectionCreate>;
  /** Deletes a collection. */
  collectionDelete?: Maybe<CollectionDelete>;
  /** Reorder the products of a collection. */
  collectionReorderProducts?: Maybe<CollectionReorderProducts>;
  /** Deletes collections. */
  collectionBulkDelete?: Maybe<CollectionBulkDelete>;
  /** Publish collections. */
  collectionBulkPublish?: Maybe<CollectionBulkPublish>;
  /** Remove products from a collection. */
  collectionRemoveProducts?: Maybe<CollectionRemoveProducts>;
  /** Updates a collection. */
  collectionUpdate?: Maybe<CollectionUpdate>;
  /** Creates/Updates translations for collection. */
  collectionTranslate?: Maybe<CollectionTranslate>;
  /**
   * Update public metadata for collection.
   * @deprecated Use the `updateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  collectionUpdateMetadata?: Maybe<CollectionUpdateMeta>;
  /**
   * Clears public metadata for collection.
   * @deprecated Use the `deleteMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  collectionClearMetadata?: Maybe<CollectionClearMeta>;
  /**
   * Update private metadata for collection.
   * @deprecated Use the `updatePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  collectionUpdatePrivateMetadata?: Maybe<CollectionUpdatePrivateMeta>;
  /**
   * Clears private metadata item for collection.
   * @deprecated Use the `deletePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  collectionClearPrivateMetadata?: Maybe<CollectionClearPrivateMeta>;
  /** Creates a new product. */
  productCreate?: Maybe<ProductCreate>;
  /** Deletes a product. */
  productDelete?: Maybe<ProductDelete>;
  /** Deletes products. */
  productBulkDelete?: Maybe<ProductBulkDelete>;
  /** Publish products. */
  productBulkPublish?: Maybe<ProductBulkPublish>;
  /** Updates an existing product. */
  productUpdate?: Maybe<ProductUpdate>;
  /** Creates/Updates translations for Product. */
  productTranslate?: Maybe<ProductTranslate>;
  /**
   * Update public metadata for product.
   * @deprecated Use the `updateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productUpdateMetadata?: Maybe<ProductUpdateMeta>;
  /**
   * Clears public metadata item for product.
   * @deprecated Use the `deleteMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productClearMetadata?: Maybe<ProductClearMeta>;
  /**
   * Update private metadata for product.
   * @deprecated Use the `updatePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productUpdatePrivateMetadata?: Maybe<ProductUpdatePrivateMeta>;
  /**
   * Clears private metadata item for product.
   * @deprecated Use the `deletePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productClearPrivateMetadata?: Maybe<ProductClearPrivateMeta>;
  /** Set product availability for purchase date. */
  productSetAvailabilityForPurchase?: Maybe<ProductSetAvailabilityForPurchase>;
  /** Create a product image. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec */
  productImageCreate?: Maybe<ProductImageCreate>;
  /** Reorder the variants of a product. Mutation updates updated_at on product and triggers PRODUCT_UPDATED webhook. */
  productVariantReorder?: Maybe<ProductVariantReorder>;
  /** Deletes a product image. */
  productImageDelete?: Maybe<ProductImageDelete>;
  /** Deletes product images. */
  productImageBulkDelete?: Maybe<ProductImageBulkDelete>;
  /** Changes ordering of the product image. */
  productImageReorder?: Maybe<ProductImageReorder>;
  /** Updates a product image. */
  productImageUpdate?: Maybe<ProductImageUpdate>;
  /** Creates a new product type. */
  productTypeCreate?: Maybe<ProductTypeCreate>;
  /** Deletes a product type. */
  productTypeDelete?: Maybe<ProductTypeDelete>;
  /** Deletes product types. */
  productTypeBulkDelete?: Maybe<ProductTypeBulkDelete>;
  /** Updates an existing product type. */
  productTypeUpdate?: Maybe<ProductTypeUpdate>;
  /** Reorder the attributes of a product type. */
  productTypeReorderAttributes?: Maybe<ProductTypeReorderAttributes>;
  /**
   * Update public metadata for product type.
   * @deprecated Use the `updateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productTypeUpdateMetadata?: Maybe<ProductTypeUpdateMeta>;
  /**
   * Clears public metadata for product type.
   * @deprecated Use the `deleteMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productTypeClearMetadata?: Maybe<ProductTypeClearMeta>;
  /**
   * Update private metadata for product type.
   * @deprecated Use the `updatePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productTypeUpdatePrivateMetadata?: Maybe<ProductTypeUpdatePrivateMeta>;
  /**
   * Clears private metadata for product type.
   * @deprecated Use the `deletePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productTypeClearPrivateMetadata?: Maybe<ProductTypeClearPrivateMeta>;
  /** Create new digital content. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec */
  digitalContentCreate?: Maybe<DigitalContentCreate>;
  /** Remove digital content assigned to given variant. */
  digitalContentDelete?: Maybe<DigitalContentDelete>;
  /** Update digital content. */
  digitalContentUpdate?: Maybe<DigitalContentUpdate>;
  /** Generate new URL to digital content. */
  digitalContentUrlCreate?: Maybe<DigitalContentUrlCreate>;
  /** Creates a new variant for a product. */
  productVariantCreate?: Maybe<ProductVariantCreate>;
  /** Deletes a product variant. */
  productVariantDelete?: Maybe<ProductVariantDelete>;
  /** Creates product variants for a given product. */
  productVariantBulkCreate?: Maybe<ProductVariantBulkCreate>;
  /** Deletes product variants. */
  productVariantBulkDelete?: Maybe<ProductVariantBulkDelete>;
  /** Creates stocks for product variant. */
  productVariantStocksCreate?: Maybe<ProductVariantStocksCreate>;
  /** Delete stocks from product variant. */
  productVariantStocksDelete?: Maybe<ProductVariantStocksDelete>;
  /** Update stocks for product variant. */
  productVariantStocksUpdate?: Maybe<ProductVariantStocksUpdate>;
  /** Updates an existing variant for product. */
  productVariantUpdate?: Maybe<ProductVariantUpdate>;
  /** Set default variant for a product. Mutation triggers PRODUCT_UPDATED webhook. */
  productVariantSetDefault?: Maybe<ProductVariantSetDefault>;
  /** Creates/Updates translations for Product Variant. */
  productVariantTranslate?: Maybe<ProductVariantTranslate>;
  /**
   * Update public metadata for product variant.
   * @deprecated Use the `updateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productVariantUpdateMetadata?: Maybe<ProductVariantUpdateMeta>;
  /**
   * Clears public metadata for product variant.
   * @deprecated Use the `deleteMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productVariantClearMetadata?: Maybe<ProductVariantClearMeta>;
  /**
   * Update private metadata for product variant.
   * @deprecated Use the `updatePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productVariantUpdatePrivateMetadata?: Maybe<ProductVariantUpdatePrivateMeta>;
  /**
   * Clears private metadata for product variant.
   * @deprecated Use the `deletePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  productVariantClearPrivateMetadata?: Maybe<ProductVariantClearPrivateMeta>;
  /** Assign an image to a product variant. */
  variantImageAssign?: Maybe<VariantImageAssign>;
  /** Unassign an image from a product variant. */
  variantImageUnassign?: Maybe<VariantImageUnassign>;
  /** Captures the authorized payment amount. */
  paymentCapture?: Maybe<PaymentCapture>;
  /** Refunds the captured payment amount. */
  paymentRefund?: Maybe<PaymentRefund>;
  /** Voids the authorized payment. */
  paymentVoid?: Maybe<PaymentVoid>;
  /** Initializes payment process when it is required by gateway. */
  paymentInitialize?: Maybe<PaymentInitialize>;
  /** Creates a new page. */
  pageCreate?: Maybe<PageCreate>;
  /** Deletes a page. */
  pageDelete?: Maybe<PageDelete>;
  /** Deletes pages. */
  pageBulkDelete?: Maybe<PageBulkDelete>;
  /** Publish pages. */
  pageBulkPublish?: Maybe<PageBulkPublish>;
  /** Updates an existing page. */
  pageUpdate?: Maybe<PageUpdate>;
  /** Creates/Updates translations for Page. */
  pageTranslate?: Maybe<PageTranslate>;
  /** Completes creating an order. */
  draftOrderComplete?: Maybe<DraftOrderComplete>;
  /** Creates a new draft order. */
  draftOrderCreate?: Maybe<DraftOrderCreate>;
  /** Deletes a draft order. */
  draftOrderDelete?: Maybe<DraftOrderDelete>;
  /** Deletes draft orders. */
  draftOrderBulkDelete?: Maybe<DraftOrderBulkDelete>;
  /** Deletes order lines. */
  draftOrderLinesBulkDelete?: Maybe<DraftOrderLinesBulkDelete>;
  /** Create order lines for a draft order. */
  draftOrderLinesCreate?: Maybe<DraftOrderLinesCreate>;
  /** Deletes an order line from a draft order. */
  draftOrderLineDelete?: Maybe<DraftOrderLineDelete>;
  /** Updates an order line of a draft order. */
  draftOrderLineUpdate?: Maybe<DraftOrderLineUpdate>;
  /** Updates a draft order. */
  draftOrderUpdate?: Maybe<DraftOrderUpdate>;
  /** Adds note to the order. */
  orderAddNote?: Maybe<OrderAddNote>;
  /** Cancel an order. */
  orderCancel?: Maybe<OrderCancel>;
  /** Capture an order. */
  orderCapture?: Maybe<OrderCapture>;
  /**
   * Clears stored private metadata value.
   * @deprecated Use the `deletePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  orderClearPrivateMeta?: Maybe<OrderClearPrivateMeta>;
  /**
   * Clears stored metadata value.
   * @deprecated Use the `deleteMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  orderClearMeta?: Maybe<OrderClearMeta>;
  /** Creates new fulfillments for an order. */
  orderFulfill?: Maybe<OrderFulfill>;
  /** Cancels existing fulfillment and optionally restocks items. */
  orderFulfillmentCancel?: Maybe<FulfillmentCancel>;
  /** Updates a fulfillment for an order. */
  orderFulfillmentUpdateTracking?: Maybe<FulfillmentUpdateTracking>;
  /**
   * Clears metadata for fulfillment.
   * @deprecated Use the `deleteMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  orderFulfillmentClearMeta?: Maybe<FulfillmentClearMeta>;
  /**
   * Clears private metadata for fulfillment.
   * @deprecated Use the `deletePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  orderFulfillmentClearPrivateMeta?: Maybe<FulfillmentClearPrivateMeta>;
  /**
   * Updates metadata for fulfillment.
   * @deprecated Use the `updateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  orderFulfillmentUpdateMeta?: Maybe<FulfillmentUpdateMeta>;
  /**
   * Updates metadata for fulfillment.
   * @deprecated Use the `updatePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  orderFulfillmentUpdatePrivateMeta?: Maybe<FulfillmentUpdatePrivateMeta>;
  /** Mark order as manually paid. */
  orderMarkAsPaid?: Maybe<OrderMarkAsPaid>;
  /** Refund an order. */
  orderRefund?: Maybe<OrderRefund>;
  /** Updates an order. */
  orderUpdate?: Maybe<OrderUpdate>;
  /**
   * Updates meta for order.
   * @deprecated Use the `updateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  orderUpdateMeta?: Maybe<OrderUpdateMeta>;
  /**
   * Updates private meta for order.
   * @deprecated Use the `updatePrivateMetadata` mutation instead. This field will be removed after 2020-07-31.
   */
  orderUpdatePrivateMeta?: Maybe<OrderUpdatePrivateMeta>;
  /** Updates a shipping method of the order. */
  orderUpdateShipping?: Maybe<OrderUpdateShipping>;
  /** Void an order. */
  orderVoid?: Maybe<OrderVoid>;
  /** Cancels orders. */
  orderBulkCancel?: Maybe<OrderBulkCancel>;
  /** Delete metadata of an object. */
  deleteMetadata?: Maybe<DeleteMetadata>;
  /** Delete object's private metadata. */
  deletePrivateMetadata?: Maybe<DeletePrivateMetadata>;
  /** Updates metadata of an object. */
  updateMetadata?: Maybe<UpdateMetadata>;
  /** Updates private metadata of an object. */
  updatePrivateMetadata?: Maybe<UpdatePrivateMetadata>;
  /** Assigns storefront's navigation menus. */
  assignNavigation?: Maybe<AssignNavigation>;
  /** Creates a new Menu. */
  menuCreate?: Maybe<MenuCreate>;
  /** Deletes a menu. */
  menuDelete?: Maybe<MenuDelete>;
  /** Deletes menus. */
  menuBulkDelete?: Maybe<MenuBulkDelete>;
  /** Updates a menu. */
  menuUpdate?: Maybe<MenuUpdate>;
  /** Creates a new menu item. */
  menuItemCreate?: Maybe<MenuItemCreate>;
  /** Deletes a menu item. */
  menuItemDelete?: Maybe<MenuItemDelete>;
  /** Deletes menu items. */
  menuItemBulkDelete?: Maybe<MenuItemBulkDelete>;
  /** Updates a menu item. */
  menuItemUpdate?: Maybe<MenuItemUpdate>;
  /** Creates/Updates translations for Menu Item. */
  menuItemTranslate?: Maybe<MenuItemTranslate>;
  /** Moves items of menus. */
  menuItemMove?: Maybe<MenuItemMove>;
  /** Request an invoice for the order using plugin. */
  invoiceRequest?: Maybe<InvoiceRequest>;
  /** Requests deletion of an invoice. */
  invoiceRequestDelete?: Maybe<InvoiceRequestDelete>;
  /** Creates a ready to send invoice. */
  invoiceCreate?: Maybe<InvoiceCreate>;
  /** Deletes an invoice. */
  invoiceDelete?: Maybe<InvoiceDelete>;
  /** Updates an invoice. */
  invoiceUpdate?: Maybe<InvoiceUpdate>;
  /** Send an invoice by email. */
  invoiceSendEmail?: Maybe<InvoiceSendEmail>;
  /** Activate a gift card. */
  giftCardActivate?: Maybe<GiftCardActivate>;
  /** Creates a new gift card. */
  giftCardCreate?: Maybe<GiftCardCreate>;
  /** Deactivate a gift card. */
  giftCardDeactivate?: Maybe<GiftCardDeactivate>;
  /** Update a gift card. */
  giftCardUpdate?: Maybe<GiftCardUpdate>;
  /** Update plugin configuration. */
  pluginUpdate?: Maybe<PluginUpdate>;
  /** Creates a new sale. */
  saleCreate?: Maybe<SaleCreate>;
  /** Deletes a sale. */
  saleDelete?: Maybe<SaleDelete>;
  /** Deletes sales. */
  saleBulkDelete?: Maybe<SaleBulkDelete>;
  /** Updates a sale. */
  saleUpdate?: Maybe<SaleUpdate>;
  /** Adds products, categories, collections to a voucher. */
  saleCataloguesAdd?: Maybe<SaleAddCatalogues>;
  /** Removes products, categories, collections from a sale. */
  saleCataloguesRemove?: Maybe<SaleRemoveCatalogues>;
  /** Creates/updates translations for a sale. */
  saleTranslate?: Maybe<SaleTranslate>;
  /** Creates a new voucher. */
  voucherCreate?: Maybe<VoucherCreate>;
  /** Deletes a voucher. */
  voucherDelete?: Maybe<VoucherDelete>;
  /** Deletes vouchers. */
  voucherBulkDelete?: Maybe<VoucherBulkDelete>;
  /** Updates a voucher. */
  voucherUpdate?: Maybe<VoucherUpdate>;
  /** Adds products, categories, collections to a voucher. */
  voucherCataloguesAdd?: Maybe<VoucherAddCatalogues>;
  /** Removes products, categories, collections from a voucher. */
  voucherCataloguesRemove?: Maybe<VoucherRemoveCatalogues>;
  /** Creates/Updates translations for Voucher. */
  voucherTranslate?: Maybe<VoucherTranslate>;
  /** Export products to csv file. */
  exportProducts?: Maybe<ExportProducts>;
  /** Adds a gift card or a voucher to a checkout. */
  checkoutAddPromoCode?: Maybe<CheckoutAddPromoCode>;
  /** Update billing address in the existing checkout. */
  checkoutBillingAddressUpdate?: Maybe<CheckoutBillingAddressUpdate>;
  /** Completes the checkout. As a result a new order is created and a payment charge is made. This action requires a successful payment before it can be performed. In case additional confirmation step as 3D secure is required confirmationNeeded flag will be set to True and no order created until payment is confirmed with second call of this mutation. */
  checkoutComplete?: Maybe<CheckoutComplete>;
  /** Create a new checkout. */
  checkoutCreate?: Maybe<CheckoutCreate>;
  /** Sets the customer as the owner of the checkout. */
  checkoutCustomerAttach?: Maybe<CheckoutCustomerAttach>;
  /** Removes the user assigned as the owner of the checkout. */
  checkoutCustomerDetach?: Maybe<CheckoutCustomerDetach>;
  /** Updates email address in the existing checkout object. */
  checkoutEmailUpdate?: Maybe<CheckoutEmailUpdate>;
  /** Deletes a CheckoutLine. */
  checkoutLineDelete?: Maybe<CheckoutLineDelete>;
  /** Adds a checkout line to the existing checkout. */
  checkoutLinesAdd?: Maybe<CheckoutLinesAdd>;
  /** Updates checkout line in the existing checkout. */
  checkoutLinesUpdate?: Maybe<CheckoutLinesUpdate>;
  /** Remove a gift card or a voucher from a checkout. */
  checkoutRemovePromoCode?: Maybe<CheckoutRemovePromoCode>;
  /** Create a new payment for given checkout. */
  checkoutPaymentCreate?: Maybe<CheckoutPaymentCreate>;
  /** Update shipping address in the existing checkout. */
  checkoutShippingAddressUpdate?: Maybe<CheckoutShippingAddressUpdate>;
  /** Updates the shipping address of the checkout. */
  checkoutShippingMethodUpdate?: Maybe<CheckoutShippingMethodUpdate>;
  /**
   * Updates metadata for checkout.
   * @deprecated Use the `updateMetadata` mutation. This field will be removed after 2020-07-31.
   */
  checkoutUpdateMetadata?: Maybe<CheckoutUpdateMeta>;
  /**
   * Clear metadata for checkout.
   * @deprecated Use the `deleteMetadata` mutation. This field will be removed after 2020-07-31.
   */
  checkoutClearMetadata?: Maybe<CheckoutClearMeta>;
  /**
   * Updates private metadata for checkout.
   * @deprecated Use the `updatePrivateMetadata` mutation. This field will be removed after 2020-07-31.
   */
  checkoutUpdatePrivateMetadata?: Maybe<CheckoutUpdatePrivateMeta>;
  /**
   * Clear private metadata for checkout.
   * @deprecated Use the `deletePrivateMetadata` mutation. This field will be removed after 2020-07-31.
   */
  checkoutClearPrivateMetadata?: Maybe<CheckoutClearPrivateMeta>;
  /** Creates a new app. */
  appCreate?: Maybe<AppCreate>;
  /** Updates an existing app. */
  appUpdate?: Maybe<AppUpdate>;
  /** Deletes an app. */
  appDelete?: Maybe<AppDelete>;
  /** Creates a new token. */
  appTokenCreate?: Maybe<AppTokenCreate>;
  /** Deletes an authentication token assigned to app. */
  appTokenDelete?: Maybe<AppTokenDelete>;
  /** Verify provided app token. */
  appTokenVerify?: Maybe<AppTokenVerify>;
  /** Install new app by using app manifest. */
  appInstall?: Maybe<AppInstall>;
  /** Retry failed installation of new app. */
  appRetryInstall?: Maybe<AppRetryInstall>;
  /** Delete failed installation. */
  appDeleteFailedInstallation?: Maybe<AppDeleteFailedInstallation>;
  /** Fetch and validate manifest. */
  appFetchManifest?: Maybe<AppFetchManifest>;
  /** Activate the app. */
  appActivate?: Maybe<AppActivate>;
  /** Deactivate the app. */
  appDeactivate?: Maybe<AppDeactivate>;
  /** Create JWT token. */
  tokenCreate?: Maybe<CreateToken>;
  /** Refresh JWT token. Mutation tries to take refreshToken from the input.If it fails it will try to take refreshToken from the http-only cookie -refreshToken. csrfToken is required when refreshToken is provided as a cookie. */
  tokenRefresh?: Maybe<RefreshToken>;
  /** Verify JWT token. */
  tokenVerify?: Maybe<VerifyToken>;
  /** Deactivate all JWT tokens of the currently authenticated user. */
  tokensDeactivateAll?: Maybe<DeactivateAllUserTokens>;
  /** Sends an email with the account password modification link. */
  requestPasswordReset?: Maybe<RequestPasswordReset>;
  /** Confirm user account with token sent by email during registration. */
  confirmAccount?: Maybe<ConfirmAccount>;
  /** Sets the user's password from the token sent by email using the RequestPasswordReset mutation. */
  setPassword?: Maybe<SetPassword>;
  /** Change the password of the logged in user. */
  passwordChange?: Maybe<PasswordChange>;
  /** Request email change of the logged in user. */
  requestEmailChange?: Maybe<RequestEmailChange>;
  /** Confirm the email change of the logged-in user. */
  confirmEmailChange?: Maybe<ConfirmEmailChange>;
  /** Create a new address for the customer. */
  accountAddressCreate?: Maybe<AccountAddressCreate>;
  /** Updates an address of the logged-in user. */
  accountAddressUpdate?: Maybe<AccountAddressUpdate>;
  /** Delete an address of the logged-in user. */
  accountAddressDelete?: Maybe<AccountAddressDelete>;
  /** Sets a default address for the authenticated user. */
  accountSetDefaultAddress?: Maybe<AccountSetDefaultAddress>;
  /** Register a new user. */
  accountRegister?: Maybe<AccountRegister>;
  /** Updates the account of the logged-in user. */
  accountUpdate?: Maybe<AccountUpdate>;
  /** Sends an email with the account removal link for the logged-in user. */
  accountRequestDeletion?: Maybe<AccountRequestDeletion>;
  /** Remove user account. */
  accountDelete?: Maybe<AccountDelete>;
  /**
   * Updates metadata of the logged-in user.
   * @deprecated Use the `updateMetadata` mutation. This field will be removed after 2020-07-31.
   */
  accountUpdateMeta?: Maybe<AccountUpdateMeta>;
  /** Creates user address. */
  addressCreate?: Maybe<AddressCreate>;
  /** Updates an address. */
  addressUpdate?: Maybe<AddressUpdate>;
  /** Deletes an address. */
  addressDelete?: Maybe<AddressDelete>;
  /** Sets a default address for the given user. */
  addressSetDefault?: Maybe<AddressSetDefault>;
  /** Creates a new customer. */
  customerCreate?: Maybe<CustomerCreate>;
  /** Updates an existing customer. */
  customerUpdate?: Maybe<CustomerUpdate>;
  /** Deletes a customer. */
  customerDelete?: Maybe<CustomerDelete>;
  /** Deletes customers. */
  customerBulkDelete?: Maybe<CustomerBulkDelete>;
  /** Creates a new staff user. */
  staffCreate?: Maybe<StaffCreate>;
  /** Updates an existing staff user. */
  staffUpdate?: Maybe<StaffUpdate>;
  /** Deletes a staff user. */
  staffDelete?: Maybe<StaffDelete>;
  /** Deletes staff users. */
  staffBulkDelete?: Maybe<StaffBulkDelete>;
  /** Create a user avatar. Only for staff members. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec */
  userAvatarUpdate?: Maybe<UserAvatarUpdate>;
  /** Deletes a user avatar. Only for staff members. */
  userAvatarDelete?: Maybe<UserAvatarDelete>;
  /** Activate or deactivate users. */
  userBulkSetActive?: Maybe<UserBulkSetActive>;
  /**
   * Updates metadata for user.
   * @deprecated Use the `updateMetadata` mutation. This field will be removed after 2020-07-31.
   */
  userUpdateMetadata?: Maybe<UserUpdateMeta>;
  /**
   * Clear metadata for user.
   * @deprecated Use the `deleteMetadata` mutation. This field will be removed after 2020-07-31.
   */
  userClearMetadata?: Maybe<UserClearMeta>;
  /**
   * Updates private metadata for user.
   * @deprecated Use the `updatePrivateMetadata` mutation. This field will be removed after 2020-07-31.
   */
  userUpdatePrivateMetadata?: Maybe<UserUpdatePrivateMeta>;
  /**
   * Clear private metadata for user.
   * @deprecated Use the `deletePrivateMetadata` mutation. This field will be removed after 2020-07-31.
   */
  userClearPrivateMetadata?: Maybe<UserClearPrivateMeta>;
  /**
   * Creates a new service account.
   * @deprecated Use the `appCreate` mutation instead. This field will be removed after 2020-07-31.
   */
  serviceAccountCreate?: Maybe<ServiceAccountCreate>;
  /**
   * Updates an existing service account.
   * @deprecated Use the `appUpdate` mutation instead. This field will be removed after 2020-07-31.
   */
  serviceAccountUpdate?: Maybe<ServiceAccountUpdate>;
  /**
   * Deletes a service account.
   * @deprecated Use the `appDelete` mutation instead. This field will be removed after 2020-07-31.
   */
  serviceAccountDelete?: Maybe<ServiceAccountDelete>;
  /**
   * Updates private metadata for a service account.
   * @deprecated Use the `updatePrivateMetadata` mutation with App instead.This field will be removed after 2020-07-31.
   */
  serviceAccountUpdatePrivateMetadata?: Maybe<ServiceAccountUpdatePrivateMeta>;
  /**
   * Clear private metadata for a service account.
   * @deprecated Use the `deletePrivateMetadata` mutation with App instead.This field will be removed after 2020-07-31.
   */
  serviceAccountClearPrivateMetadata?: Maybe<ServiceAccountClearPrivateMeta>;
  /**
   * Creates a new token.
   * @deprecated Use the `appTokenCreate` mutation instead. This field will be removed after 2020-07-31.
   */
  serviceAccountTokenCreate?: Maybe<ServiceAccountTokenCreate>;
  /**
   * Deletes an authentication token assigned to service account.
   * @deprecated Use the `appTokenDelete` mutation instead. This field will be removed after 2020-07-31.
   */
  serviceAccountTokenDelete?: Maybe<ServiceAccountTokenDelete>;
  /** Create new permission group. */
  permissionGroupCreate?: Maybe<PermissionGroupCreate>;
  /** Update permission group. */
  permissionGroupUpdate?: Maybe<PermissionGroupUpdate>;
  /** Delete permission group. */
  permissionGroupDelete?: Maybe<PermissionGroupDelete>;
};


export type MutationWebhookCreateArgs = {
  input: WebhookCreateInput;
};


export type MutationWebhookDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationWebhookUpdateArgs = {
  id: Scalars['ID'];
  input: WebhookUpdateInput;
};


export type MutationCreateWarehouseArgs = {
  input: WarehouseCreateInput;
};


export type MutationUpdateWarehouseArgs = {
  id: Scalars['ID'];
  input: WarehouseUpdateInput;
};


export type MutationDeleteWarehouseArgs = {
  id: Scalars['ID'];
};


export type MutationAssignWarehouseShippingZoneArgs = {
  id: Scalars['ID'];
  shippingZoneIds: Array<Scalars['ID']>;
};


export type MutationUnassignWarehouseShippingZoneArgs = {
  id: Scalars['ID'];
  shippingZoneIds: Array<Scalars['ID']>;
};


export type MutationAuthorizationKeyAddArgs = {
  input: AuthorizationKeyInput;
  keyType: AuthorizationKeyType;
};


export type MutationAuthorizationKeyDeleteArgs = {
  keyType: AuthorizationKeyType;
};


export type MutationStaffNotificationRecipientCreateArgs = {
  input: StaffNotificationRecipientInput;
};


export type MutationStaffNotificationRecipientUpdateArgs = {
  id: Scalars['ID'];
  input: StaffNotificationRecipientInput;
};


export type MutationStaffNotificationRecipientDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationHomepageCollectionUpdateArgs = {
  collection?: Maybe<Scalars['ID']>;
};


export type MutationShopDomainUpdateArgs = {
  input?: Maybe<SiteDomainInput>;
};


export type MutationShopSettingsUpdateArgs = {
  input: ShopSettingsInput;
};


export type MutationShopSettingsTranslateArgs = {
  input: ShopSettingsTranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationShopAddressUpdateArgs = {
  input?: Maybe<AddressInput>;
};


export type MutationShippingPriceCreateArgs = {
  input: ShippingPriceInput;
};


export type MutationShippingPriceDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationShippingPriceBulkDeleteArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationShippingPriceUpdateArgs = {
  id: Scalars['ID'];
  input: ShippingPriceInput;
};


export type MutationShippingPriceTranslateArgs = {
  id: Scalars['ID'];
  input: NameTranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationShippingZoneCreateArgs = {
  input: ShippingZoneCreateInput;
};


export type MutationShippingZoneDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationShippingZoneBulkDeleteArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationShippingZoneUpdateArgs = {
  id: Scalars['ID'];
  input: ShippingZoneUpdateInput;
};


export type MutationAttributeCreateArgs = {
  input: AttributeCreateInput;
};


export type MutationAttributeDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationAttributeBulkDeleteArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationAttributeAssignArgs = {
  operations: Array<Maybe<AttributeAssignInput>>;
  productTypeId: Scalars['ID'];
};


export type MutationAttributeUnassignArgs = {
  attributeIds: Array<Maybe<Scalars['ID']>>;
  productTypeId: Scalars['ID'];
};


export type MutationAttributeUpdateArgs = {
  id: Scalars['ID'];
  input: AttributeUpdateInput;
};


export type MutationAttributeTranslateArgs = {
  id: Scalars['ID'];
  input: NameTranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationAttributeUpdateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationAttributeClearMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationAttributeUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationAttributeClearPrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationAttributeValueCreateArgs = {
  attribute: Scalars['ID'];
  input: AttributeValueCreateInput;
};


export type MutationAttributeValueDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationAttributeValueBulkDeleteArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationAttributeValueUpdateArgs = {
  id: Scalars['ID'];
  input: AttributeValueCreateInput;
};


export type MutationAttributeValueTranslateArgs = {
  id: Scalars['ID'];
  input: NameTranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationAttributeReorderValuesArgs = {
  attributeId: Scalars['ID'];
  moves: Array<Maybe<ReorderInput>>;
};


export type MutationCategoryCreateArgs = {
  input: CategoryInput;
  parent?: Maybe<Scalars['ID']>;
};


export type MutationCategoryDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationCategoryBulkDeleteArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationCategoryUpdateArgs = {
  id: Scalars['ID'];
  input: CategoryInput;
};


export type MutationCategoryTranslateArgs = {
  id: Scalars['ID'];
  input: TranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationCategoryUpdateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationCategoryClearMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationCategoryUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationCategoryClearPrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationCollectionAddProductsArgs = {
  collectionId: Scalars['ID'];
  products: Array<Maybe<Scalars['ID']>>;
};


export type MutationCollectionCreateArgs = {
  input: CollectionCreateInput;
};


export type MutationCollectionDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationCollectionReorderProductsArgs = {
  collectionId: Scalars['ID'];
  moves: Array<Maybe<MoveProductInput>>;
};


export type MutationCollectionBulkDeleteArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationCollectionBulkPublishArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
  isPublished: Scalars['Boolean'];
};


export type MutationCollectionRemoveProductsArgs = {
  collectionId: Scalars['ID'];
  products: Array<Maybe<Scalars['ID']>>;
};


export type MutationCollectionUpdateArgs = {
  id: Scalars['ID'];
  input: CollectionInput;
};


export type MutationCollectionTranslateArgs = {
  id: Scalars['ID'];
  input: TranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationCollectionUpdateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationCollectionClearMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationCollectionUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationCollectionClearPrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationProductCreateArgs = {
  input: ProductCreateInput;
};


export type MutationProductDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationProductBulkDeleteArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationProductBulkPublishArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
  isPublished: Scalars['Boolean'];
};


export type MutationProductUpdateArgs = {
  id: Scalars['ID'];
  input: ProductInput;
};


export type MutationProductTranslateArgs = {
  id: Scalars['ID'];
  input: TranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationProductUpdateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationProductClearMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationProductUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationProductClearPrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationProductSetAvailabilityForPurchaseArgs = {
  isAvailable: Scalars['Boolean'];
  productId: Scalars['ID'];
  startDate?: Maybe<Scalars['Date']>;
};


export type MutationProductImageCreateArgs = {
  input: ProductImageCreateInput;
};


export type MutationProductVariantReorderArgs = {
  moves: Array<Maybe<ReorderInput>>;
  productId: Scalars['ID'];
};


export type MutationProductImageDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationProductImageBulkDeleteArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationProductImageReorderArgs = {
  imagesIds: Array<Maybe<Scalars['ID']>>;
  productId: Scalars['ID'];
};


export type MutationProductImageUpdateArgs = {
  id: Scalars['ID'];
  input: ProductImageUpdateInput;
};


export type MutationProductTypeCreateArgs = {
  input: ProductTypeInput;
};


export type MutationProductTypeDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationProductTypeBulkDeleteArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationProductTypeUpdateArgs = {
  id: Scalars['ID'];
  input: ProductTypeInput;
};


export type MutationProductTypeReorderAttributesArgs = {
  moves: Array<Maybe<ReorderInput>>;
  productTypeId: Scalars['ID'];
  type: AttributeTypeEnum;
};


export type MutationProductTypeUpdateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationProductTypeClearMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationProductTypeUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationProductTypeClearPrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationDigitalContentCreateArgs = {
  input: DigitalContentUploadInput;
  variantId: Scalars['ID'];
};


export type MutationDigitalContentDeleteArgs = {
  variantId: Scalars['ID'];
};


export type MutationDigitalContentUpdateArgs = {
  input: DigitalContentInput;
  variantId: Scalars['ID'];
};


export type MutationDigitalContentUrlCreateArgs = {
  input: DigitalContentUrlCreateInput;
};


export type MutationProductVariantCreateArgs = {
  input: ProductVariantCreateInput;
};


export type MutationProductVariantDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationProductVariantBulkCreateArgs = {
  product: Scalars['ID'];
  variants: Array<Maybe<ProductVariantBulkCreateInput>>;
};


export type MutationProductVariantBulkDeleteArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationProductVariantStocksCreateArgs = {
  stocks: Array<StockInput>;
  variantId: Scalars['ID'];
};


export type MutationProductVariantStocksDeleteArgs = {
  variantId: Scalars['ID'];
  warehouseIds?: Maybe<Array<Scalars['ID']>>;
};


export type MutationProductVariantStocksUpdateArgs = {
  stocks: Array<StockInput>;
  variantId: Scalars['ID'];
};


export type MutationProductVariantUpdateArgs = {
  id: Scalars['ID'];
  input: ProductVariantInput;
};


export type MutationProductVariantSetDefaultArgs = {
  productId: Scalars['ID'];
  variantId: Scalars['ID'];
};


export type MutationProductVariantTranslateArgs = {
  id: Scalars['ID'];
  input: NameTranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationProductVariantUpdateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationProductVariantClearMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationProductVariantUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationProductVariantClearPrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationVariantImageAssignArgs = {
  imageId: Scalars['ID'];
  variantId: Scalars['ID'];
};


export type MutationVariantImageUnassignArgs = {
  imageId: Scalars['ID'];
  variantId: Scalars['ID'];
};


export type MutationPaymentCaptureArgs = {
  amount?: Maybe<Scalars['PositiveDecimal']>;
  paymentId: Scalars['ID'];
};


export type MutationPaymentRefundArgs = {
  amount?: Maybe<Scalars['PositiveDecimal']>;
  paymentId: Scalars['ID'];
};


export type MutationPaymentVoidArgs = {
  paymentId: Scalars['ID'];
};


export type MutationPaymentInitializeArgs = {
  gateway: Scalars['String'];
  paymentData?: Maybe<Scalars['JSONString']>;
};


export type MutationPageCreateArgs = {
  input: PageInput;
};


export type MutationPageDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationPageBulkDeleteArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationPageBulkPublishArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
  isPublished: Scalars['Boolean'];
};


export type MutationPageUpdateArgs = {
  id: Scalars['ID'];
  input: PageInput;
};


export type MutationPageTranslateArgs = {
  id: Scalars['ID'];
  input: PageTranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationDraftOrderCompleteArgs = {
  id: Scalars['ID'];
};


export type MutationDraftOrderCreateArgs = {
  input: DraftOrderCreateInput;
};


export type MutationDraftOrderDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationDraftOrderBulkDeleteArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationDraftOrderLinesBulkDeleteArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationDraftOrderLinesCreateArgs = {
  id: Scalars['ID'];
  input: Array<Maybe<OrderLineCreateInput>>;
};


export type MutationDraftOrderLineDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationDraftOrderLineUpdateArgs = {
  id: Scalars['ID'];
  input: OrderLineInput;
};


export type MutationDraftOrderUpdateArgs = {
  id: Scalars['ID'];
  input: DraftOrderInput;
};


export type MutationOrderAddNoteArgs = {
  order: Scalars['ID'];
  input: OrderAddNoteInput;
};


export type MutationOrderCancelArgs = {
  id: Scalars['ID'];
};


export type MutationOrderCaptureArgs = {
  amount: Scalars['PositiveDecimal'];
  id: Scalars['ID'];
};


export type MutationOrderClearPrivateMetaArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationOrderClearMetaArgs = {
  input: MetaPath;
  token: Scalars['UUID'];
};


export type MutationOrderFulfillArgs = {
  input: OrderFulfillInput;
  order?: Maybe<Scalars['ID']>;
};


export type MutationOrderFulfillmentCancelArgs = {
  id: Scalars['ID'];
  input: FulfillmentCancelInput;
};


export type MutationOrderFulfillmentUpdateTrackingArgs = {
  id: Scalars['ID'];
  input: FulfillmentUpdateTrackingInput;
};


export type MutationOrderFulfillmentClearMetaArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationOrderFulfillmentClearPrivateMetaArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationOrderFulfillmentUpdateMetaArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationOrderFulfillmentUpdatePrivateMetaArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationOrderMarkAsPaidArgs = {
  id: Scalars['ID'];
};


export type MutationOrderRefundArgs = {
  amount: Scalars['PositiveDecimal'];
  id: Scalars['ID'];
};


export type MutationOrderUpdateArgs = {
  id: Scalars['ID'];
  input: OrderUpdateInput;
};


export type MutationOrderUpdateMetaArgs = {
  input: MetaInput;
  token: Scalars['UUID'];
};


export type MutationOrderUpdatePrivateMetaArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationOrderUpdateShippingArgs = {
  order: Scalars['ID'];
  input?: Maybe<OrderUpdateShippingInput>;
};


export type MutationOrderVoidArgs = {
  id: Scalars['ID'];
};


export type MutationOrderBulkCancelArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationDeleteMetadataArgs = {
  id: Scalars['ID'];
  keys: Array<Scalars['String']>;
};


export type MutationDeletePrivateMetadataArgs = {
  id: Scalars['ID'];
  keys: Array<Scalars['String']>;
};


export type MutationUpdateMetadataArgs = {
  id: Scalars['ID'];
  input: Array<MetadataInput>;
};


export type MutationUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: Array<MetadataInput>;
};


export type MutationAssignNavigationArgs = {
  menu?: Maybe<Scalars['ID']>;
  navigationType: NavigationType;
};


export type MutationMenuCreateArgs = {
  input: MenuCreateInput;
};


export type MutationMenuDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationMenuBulkDeleteArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationMenuUpdateArgs = {
  id: Scalars['ID'];
  input: MenuInput;
};


export type MutationMenuItemCreateArgs = {
  input: MenuItemCreateInput;
};


export type MutationMenuItemDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationMenuItemBulkDeleteArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationMenuItemUpdateArgs = {
  id: Scalars['ID'];
  input: MenuItemInput;
};


export type MutationMenuItemTranslateArgs = {
  id: Scalars['ID'];
  input: NameTranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationMenuItemMoveArgs = {
  menu: Scalars['ID'];
  moves: Array<Maybe<MenuItemMoveInput>>;
};


export type MutationInvoiceRequestArgs = {
  number?: Maybe<Scalars['String']>;
  orderId: Scalars['ID'];
};


export type MutationInvoiceRequestDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationInvoiceCreateArgs = {
  input: InvoiceCreateInput;
  orderId: Scalars['ID'];
};


export type MutationInvoiceDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationInvoiceUpdateArgs = {
  id: Scalars['ID'];
  input: UpdateInvoiceInput;
};


export type MutationInvoiceSendEmailArgs = {
  id: Scalars['ID'];
};


export type MutationGiftCardActivateArgs = {
  id: Scalars['ID'];
};


export type MutationGiftCardCreateArgs = {
  input: GiftCardCreateInput;
};


export type MutationGiftCardDeactivateArgs = {
  id: Scalars['ID'];
};


export type MutationGiftCardUpdateArgs = {
  id: Scalars['ID'];
  input: GiftCardUpdateInput;
};


export type MutationPluginUpdateArgs = {
  id: Scalars['ID'];
  input: PluginUpdateInput;
};


export type MutationSaleCreateArgs = {
  input: SaleInput;
};


export type MutationSaleDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationSaleBulkDeleteArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationSaleUpdateArgs = {
  id: Scalars['ID'];
  input: SaleInput;
};


export type MutationSaleCataloguesAddArgs = {
  id: Scalars['ID'];
  input: CatalogueInput;
};


export type MutationSaleCataloguesRemoveArgs = {
  id: Scalars['ID'];
  input: CatalogueInput;
};


export type MutationSaleTranslateArgs = {
  id: Scalars['ID'];
  input: NameTranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationVoucherCreateArgs = {
  input: VoucherInput;
};


export type MutationVoucherDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationVoucherBulkDeleteArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationVoucherUpdateArgs = {
  id: Scalars['ID'];
  input: VoucherInput;
};


export type MutationVoucherCataloguesAddArgs = {
  id: Scalars['ID'];
  input: CatalogueInput;
};


export type MutationVoucherCataloguesRemoveArgs = {
  id: Scalars['ID'];
  input: CatalogueInput;
};


export type MutationVoucherTranslateArgs = {
  id: Scalars['ID'];
  input: NameTranslationInput;
  languageCode: LanguageCodeEnum;
};


export type MutationExportProductsArgs = {
  input: ExportProductsInput;
};


export type MutationCheckoutAddPromoCodeArgs = {
  checkoutId: Scalars['ID'];
  promoCode: Scalars['String'];
};


export type MutationCheckoutBillingAddressUpdateArgs = {
  billingAddress: AddressInput;
  checkoutId: Scalars['ID'];
};


export type MutationCheckoutCompleteArgs = {
  checkoutId: Scalars['ID'];
  paymentData?: Maybe<Scalars['JSONString']>;
  redirectUrl?: Maybe<Scalars['String']>;
  storeSource?: Maybe<Scalars['Boolean']>;
};


export type MutationCheckoutCreateArgs = {
  input: CheckoutCreateInput;
};


export type MutationCheckoutCustomerAttachArgs = {
  checkoutId: Scalars['ID'];
  customerId?: Maybe<Scalars['ID']>;
};


export type MutationCheckoutCustomerDetachArgs = {
  checkoutId: Scalars['ID'];
};


export type MutationCheckoutEmailUpdateArgs = {
  checkoutId?: Maybe<Scalars['ID']>;
  email: Scalars['String'];
};


export type MutationCheckoutLineDeleteArgs = {
  checkoutId: Scalars['ID'];
  lineId?: Maybe<Scalars['ID']>;
};


export type MutationCheckoutLinesAddArgs = {
  checkoutId: Scalars['ID'];
  lines: Array<Maybe<CheckoutLineInput>>;
};


export type MutationCheckoutLinesUpdateArgs = {
  checkoutId: Scalars['ID'];
  lines: Array<Maybe<CheckoutLineInput>>;
};


export type MutationCheckoutRemovePromoCodeArgs = {
  checkoutId: Scalars['ID'];
  promoCode: Scalars['String'];
};


export type MutationCheckoutPaymentCreateArgs = {
  checkoutId: Scalars['ID'];
  input: PaymentInput;
};


export type MutationCheckoutShippingAddressUpdateArgs = {
  checkoutId: Scalars['ID'];
  shippingAddress: AddressInput;
};


export type MutationCheckoutShippingMethodUpdateArgs = {
  checkoutId?: Maybe<Scalars['ID']>;
  shippingMethodId: Scalars['ID'];
};


export type MutationCheckoutUpdateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationCheckoutClearMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationCheckoutUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationCheckoutClearPrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationAppCreateArgs = {
  input: AppInput;
};


export type MutationAppUpdateArgs = {
  id: Scalars['ID'];
  input: AppInput;
};


export type MutationAppDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationAppTokenCreateArgs = {
  input: AppTokenInput;
};


export type MutationAppTokenDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationAppTokenVerifyArgs = {
  token: Scalars['String'];
};


export type MutationAppInstallArgs = {
  input: AppInstallInput;
};


export type MutationAppRetryInstallArgs = {
  activateAfterInstallation?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};


export type MutationAppDeleteFailedInstallationArgs = {
  id: Scalars['ID'];
};


export type MutationAppFetchManifestArgs = {
  manifestUrl: Scalars['String'];
};


export type MutationAppActivateArgs = {
  id: Scalars['ID'];
};


export type MutationAppDeactivateArgs = {
  id: Scalars['ID'];
};


export type MutationTokenCreateArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationTokenRefreshArgs = {
  csrfToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};


export type MutationTokenVerifyArgs = {
  token: Scalars['String'];
};


export type MutationRequestPasswordResetArgs = {
  email: Scalars['String'];
  redirectUrl: Scalars['String'];
};


export type MutationConfirmAccountArgs = {
  email: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSetPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationPasswordChangeArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationRequestEmailChangeArgs = {
  newEmail: Scalars['String'];
  password: Scalars['String'];
  redirectUrl: Scalars['String'];
};


export type MutationConfirmEmailChangeArgs = {
  token: Scalars['String'];
};


export type MutationAccountAddressCreateArgs = {
  input: AddressInput;
  type?: Maybe<AddressTypeEnum>;
};


export type MutationAccountAddressUpdateArgs = {
  id: Scalars['ID'];
  input: AddressInput;
};


export type MutationAccountAddressDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationAccountSetDefaultAddressArgs = {
  id: Scalars['ID'];
  type: AddressTypeEnum;
};


export type MutationAccountRegisterArgs = {
  input: AccountRegisterInput;
};


export type MutationAccountUpdateArgs = {
  input: AccountInput;
};


export type MutationAccountRequestDeletionArgs = {
  redirectUrl: Scalars['String'];
};


export type MutationAccountDeleteArgs = {
  token: Scalars['String'];
};


export type MutationAccountUpdateMetaArgs = {
  input: MetaInput;
};


export type MutationAddressCreateArgs = {
  input: AddressInput;
  userId: Scalars['ID'];
};


export type MutationAddressUpdateArgs = {
  id: Scalars['ID'];
  input: AddressInput;
};


export type MutationAddressDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationAddressSetDefaultArgs = {
  addressId: Scalars['ID'];
  type: AddressTypeEnum;
  userId: Scalars['ID'];
};


export type MutationCustomerCreateArgs = {
  input: UserCreateInput;
};


export type MutationCustomerUpdateArgs = {
  id: Scalars['ID'];
  input: CustomerInput;
};


export type MutationCustomerDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationCustomerBulkDeleteArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationStaffCreateArgs = {
  input: StaffCreateInput;
};


export type MutationStaffUpdateArgs = {
  id: Scalars['ID'];
  input: StaffUpdateInput;
};


export type MutationStaffDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationStaffBulkDeleteArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
};


export type MutationUserAvatarUpdateArgs = {
  image: Scalars['Upload'];
};


export type MutationUserBulkSetActiveArgs = {
  ids: Array<Maybe<Scalars['ID']>>;
  isActive: Scalars['Boolean'];
};


export type MutationUserUpdateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationUserClearMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationUserUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationUserClearPrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationServiceAccountCreateArgs = {
  input: ServiceAccountInput;
};


export type MutationServiceAccountUpdateArgs = {
  id: Scalars['ID'];
  input: ServiceAccountInput;
};


export type MutationServiceAccountDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationServiceAccountUpdatePrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaInput;
};


export type MutationServiceAccountClearPrivateMetadataArgs = {
  id: Scalars['ID'];
  input: MetaPath;
};


export type MutationServiceAccountTokenCreateArgs = {
  input: ServiceAccountTokenInput;
};


export type MutationServiceAccountTokenDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationPermissionGroupCreateArgs = {
  input: PermissionGroupCreateInput;
};


export type MutationPermissionGroupUpdateArgs = {
  id: Scalars['ID'];
  input: PermissionGroupUpdateInput;
};


export type MutationPermissionGroupDeleteArgs = {
  id: Scalars['ID'];
};

/** Creates a new webhook subscription. */
export type WebhookCreate = {
  __typename?: 'WebhookCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  webhookErrors: Array<WebhookError>;
  webhook?: Maybe<Webhook>;
};

/** Represents an error in the input of a mutation. */
export type Error = {
  __typename?: 'Error';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
};

export type WebhookError = {
  __typename?: 'WebhookError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: WebhookErrorCode;
};

/** An enumeration. */
export enum WebhookErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type WebhookCreateInput = {
  /** The name of the webhook. */
  name?: Maybe<Scalars['String']>;
  /** The url to receive the payload. */
  targetUrl?: Maybe<Scalars['String']>;
  /** The events that webhook wants to subscribe. The CHECKOUT_QUANTITY_CHANGED is depreacted. It will be removed in Saleor 3.0 */
  events?: Maybe<Array<Maybe<WebhookEventTypeEnum>>>;
  /** DEPRECATED: Use the `app` field instead. This field will be removed after 2020-07-31. */
  serviceAccount?: Maybe<Scalars['ID']>;
  /** ID of the app to which webhook belongs. */
  app?: Maybe<Scalars['ID']>;
  /** Determine if webhook will be set active or not. */
  isActive?: Maybe<Scalars['Boolean']>;
  /** The secret key used to create a hash signature with each payload. */
  secretKey?: Maybe<Scalars['String']>;
};

/** Deletes a webhook subscription. */
export type WebhookDelete = {
  __typename?: 'WebhookDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  webhookErrors: Array<WebhookError>;
  webhook?: Maybe<Webhook>;
};

/** Updates a webhook subscription. */
export type WebhookUpdate = {
  __typename?: 'WebhookUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  webhookErrors: Array<WebhookError>;
  webhook?: Maybe<Webhook>;
};

export type WebhookUpdateInput = {
  /** The new name of the webhook. */
  name?: Maybe<Scalars['String']>;
  /** The url to receive the payload. */
  targetUrl?: Maybe<Scalars['String']>;
  /** The events that webhook wants to subscribe. The CHECKOUT_QUANTITY_CHANGED is depreacted. It will be removed in Saleor 3.0 */
  events?: Maybe<Array<Maybe<WebhookEventTypeEnum>>>;
  /** DEPRECATED: Use the `app` field instead. This field will be removed after 2020-07-31. */
  serviceAccount?: Maybe<Scalars['ID']>;
  /** ID of the app to which webhook belongs. */
  app?: Maybe<Scalars['ID']>;
  /** Determine if webhook will be set active or not. */
  isActive?: Maybe<Scalars['Boolean']>;
  /** Use to create a hash signature with each payload. */
  secretKey?: Maybe<Scalars['String']>;
};

/** Creates new warehouse. */
export type WarehouseCreate = {
  __typename?: 'WarehouseCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  warehouseErrors: Array<WarehouseError>;
  warehouse?: Maybe<Warehouse>;
};

export type WarehouseError = {
  __typename?: 'WarehouseError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: WarehouseErrorCode;
};

/** An enumeration. */
export enum WarehouseErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type WarehouseCreateInput = {
  /** Warehouse slug. */
  slug?: Maybe<Scalars['String']>;
  /** Company name. */
  companyName?: Maybe<Scalars['String']>;
  /** The email address of the warehouse. */
  email?: Maybe<Scalars['String']>;
  /** Warehouse name. */
  name: Scalars['String'];
  /** Address of the warehouse. */
  address: WarehouseAddressInput;
  /** Shipping zones supported by the warehouse. */
  shippingZones?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type WarehouseAddressInput = {
  /** Address. */
  streetAddress1: Scalars['String'];
  /** Address. */
  streetAddress2?: Maybe<Scalars['String']>;
  /** City. */
  city: Scalars['String'];
  /** District. */
  cityArea?: Maybe<Scalars['String']>;
  /** Postal code. */
  postalCode?: Maybe<Scalars['String']>;
  /** Country. */
  country: CountryCode;
  /** State or province. */
  countryArea?: Maybe<Scalars['String']>;
  /** Phone number. */
  phone?: Maybe<Scalars['String']>;
};

/** Updates given warehouse. */
export type WarehouseUpdate = {
  __typename?: 'WarehouseUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  warehouseErrors: Array<WarehouseError>;
  warehouse?: Maybe<Warehouse>;
};

export type WarehouseUpdateInput = {
  /** Warehouse slug. */
  slug?: Maybe<Scalars['String']>;
  /** Company name. */
  companyName?: Maybe<Scalars['String']>;
  /** The email address of the warehouse. */
  email?: Maybe<Scalars['String']>;
  /** Warehouse name. */
  name?: Maybe<Scalars['String']>;
  /** Address of the warehouse. */
  address?: Maybe<WarehouseAddressInput>;
};

/** Deletes selected warehouse. */
export type WarehouseDelete = {
  __typename?: 'WarehouseDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  warehouseErrors: Array<WarehouseError>;
  warehouse?: Maybe<Warehouse>;
};

/** Add shipping zone to given warehouse. */
export type WarehouseShippingZoneAssign = {
  __typename?: 'WarehouseShippingZoneAssign';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  warehouseErrors: Array<WarehouseError>;
  warehouse?: Maybe<Warehouse>;
};

/** Remove shipping zone from given warehouse. */
export type WarehouseShippingZoneUnassign = {
  __typename?: 'WarehouseShippingZoneUnassign';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  warehouseErrors: Array<WarehouseError>;
  warehouse?: Maybe<Warehouse>;
};

/** Adds an authorization key. */
export type AuthorizationKeyAdd = {
  __typename?: 'AuthorizationKeyAdd';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Newly added authorization key. */
  authorizationKey?: Maybe<AuthorizationKey>;
  /** Updated shop. */
  shop?: Maybe<Shop>;
  shopErrors: Array<ShopError>;
};

export type ShopError = {
  __typename?: 'ShopError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: ShopErrorCode;
};

/** An enumeration. */
export enum ShopErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  CannotFetchTaxRates = 'CANNOT_FETCH_TAX_RATES',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type AuthorizationKeyInput = {
  /** Client authorization key (client ID). */
  key: Scalars['String'];
  /** Client secret. */
  password: Scalars['String'];
};

/** Deletes an authorization key. */
export type AuthorizationKeyDelete = {
  __typename?: 'AuthorizationKeyDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Authorization key that was deleted. */
  authorizationKey?: Maybe<AuthorizationKey>;
  /** Updated shop. */
  shop?: Maybe<Shop>;
  shopErrors: Array<ShopError>;
};

/** Creates a new staff notification recipient. */
export type StaffNotificationRecipientCreate = {
  __typename?: 'StaffNotificationRecipientCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  shopErrors: Array<ShopError>;
  staffNotificationRecipient?: Maybe<StaffNotificationRecipient>;
};

export type StaffNotificationRecipientInput = {
  /** The ID of the user subscribed to email notifications.. */
  user?: Maybe<Scalars['ID']>;
  /** Email address of a user subscribed to email notifications. */
  email?: Maybe<Scalars['String']>;
  /** Determines if a notification active. */
  active?: Maybe<Scalars['Boolean']>;
};

/** Updates a staff notification recipient. */
export type StaffNotificationRecipientUpdate = {
  __typename?: 'StaffNotificationRecipientUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  shopErrors: Array<ShopError>;
  staffNotificationRecipient?: Maybe<StaffNotificationRecipient>;
};

/** Delete staff notification recipient. */
export type StaffNotificationRecipientDelete = {
  __typename?: 'StaffNotificationRecipientDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  shopErrors: Array<ShopError>;
  staffNotificationRecipient?: Maybe<StaffNotificationRecipient>;
};

/** Updates homepage collection of the shop. */
export type HomepageCollectionUpdate = {
  __typename?: 'HomepageCollectionUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated shop. */
  shop?: Maybe<Shop>;
  shopErrors: Array<ShopError>;
};

/** Updates site domain of the shop. */
export type ShopDomainUpdate = {
  __typename?: 'ShopDomainUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated shop. */
  shop?: Maybe<Shop>;
  shopErrors: Array<ShopError>;
};

export type SiteDomainInput = {
  /** Domain name for shop. */
  domain?: Maybe<Scalars['String']>;
  /** Shop site name. */
  name?: Maybe<Scalars['String']>;
};

/** Updates shop settings. */
export type ShopSettingsUpdate = {
  __typename?: 'ShopSettingsUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated shop. */
  shop?: Maybe<Shop>;
  shopErrors: Array<ShopError>;
};

export type ShopSettingsInput = {
  /** Header text. */
  headerText?: Maybe<Scalars['String']>;
  /** SEO description. */
  description?: Maybe<Scalars['String']>;
  /** Include taxes in prices. */
  includeTaxesInPrices?: Maybe<Scalars['Boolean']>;
  /** Display prices with tax in store. */
  displayGrossPrices?: Maybe<Scalars['Boolean']>;
  /** Charge taxes on shipping. */
  chargeTaxesOnShipping?: Maybe<Scalars['Boolean']>;
  /** Enable inventory tracking. */
  trackInventoryByDefault?: Maybe<Scalars['Boolean']>;
  /** Default weight unit. */
  defaultWeightUnit?: Maybe<WeightUnitsEnum>;
  /** Enable automatic fulfillment for all digital products. */
  automaticFulfillmentDigitalProducts?: Maybe<Scalars['Boolean']>;
  /** Default number of max downloads per digital content URL. */
  defaultDigitalMaxDownloads?: Maybe<Scalars['Int']>;
  /** Default number of days which digital content URL will be valid. */
  defaultDigitalUrlValidDays?: Maybe<Scalars['Int']>;
  /** Default email sender's name. */
  defaultMailSenderName?: Maybe<Scalars['String']>;
  /** Default email sender's address. */
  defaultMailSenderAddress?: Maybe<Scalars['String']>;
  /** URL of a view where customers can set their password. */
  customerSetPasswordUrl?: Maybe<Scalars['String']>;
};

/** Fetch tax rates. */
export type ShopFetchTaxRates = {
  __typename?: 'ShopFetchTaxRates';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated shop. */
  shop?: Maybe<Shop>;
  shopErrors: Array<ShopError>;
};

/** Creates/Updates translations for Shop Settings. */
export type ShopSettingsTranslate = {
  __typename?: 'ShopSettingsTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated shop. */
  shop?: Maybe<Shop>;
  translationErrors: Array<TranslationError>;
};

export type TranslationError = {
  __typename?: 'TranslationError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: TranslationErrorCode;
};

/** An enumeration. */
export enum TranslationErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED'
}

export type ShopSettingsTranslationInput = {
  headerText?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

/** Update the shop's address. If the `null` value is passed, the currently selected address will be deleted. */
export type ShopAddressUpdate = {
  __typename?: 'ShopAddressUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated shop. */
  shop?: Maybe<Shop>;
  shopErrors: Array<ShopError>;
};

export type AddressInput = {
  /** Given name. */
  firstName?: Maybe<Scalars['String']>;
  /** Family name. */
  lastName?: Maybe<Scalars['String']>;
  /** Company or organization. */
  companyName?: Maybe<Scalars['String']>;
  /** Address. */
  streetAddress1?: Maybe<Scalars['String']>;
  /** Address. */
  streetAddress2?: Maybe<Scalars['String']>;
  /** City. */
  city?: Maybe<Scalars['String']>;
  /** District. */
  cityArea?: Maybe<Scalars['String']>;
  /** Postal code. */
  postalCode?: Maybe<Scalars['String']>;
  /** Country. */
  country?: Maybe<CountryCode>;
  /** State or province. */
  countryArea?: Maybe<Scalars['String']>;
  /** Phone number. */
  phone?: Maybe<Scalars['String']>;
};

/** Creates a new shipping price. */
export type ShippingPriceCreate = {
  __typename?: 'ShippingPriceCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A shipping zone to which the shipping method belongs. */
  shippingZone?: Maybe<ShippingZone>;
  shippingErrors: Array<ShippingError>;
  shippingMethod?: Maybe<ShippingMethod>;
};

export type ShippingError = {
  __typename?: 'ShippingError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: ShippingErrorCode;
  /** List of warehouse IDs which causes the error. */
  warehouses?: Maybe<Array<Scalars['ID']>>;
};

/** An enumeration. */
export enum ShippingErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  MaxLessThanMin = 'MAX_LESS_THAN_MIN',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM'
}

export type ShippingPriceInput = {
  /** Name of the shipping method. */
  name?: Maybe<Scalars['String']>;
  /** Shipping price of the shipping method. */
  price?: Maybe<Scalars['PositiveDecimal']>;
  /** Minimum order price to use this shipping method. */
  minimumOrderPrice?: Maybe<Scalars['PositiveDecimal']>;
  /** Maximum order price to use this shipping method. */
  maximumOrderPrice?: Maybe<Scalars['PositiveDecimal']>;
  /** Minimum order weight to use this shipping method. */
  minimumOrderWeight?: Maybe<Scalars['WeightScalar']>;
  /** Maximum order weight to use this shipping method. */
  maximumOrderWeight?: Maybe<Scalars['WeightScalar']>;
  /** Shipping type: price or weight based. */
  type?: Maybe<ShippingMethodTypeEnum>;
  /** Shipping zone this method belongs to. */
  shippingZone?: Maybe<Scalars['ID']>;
};



/** Deletes a shipping price. */
export type ShippingPriceDelete = {
  __typename?: 'ShippingPriceDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A shipping method to delete. */
  shippingMethod?: Maybe<ShippingMethod>;
  /** A shipping zone to which the shipping method belongs. */
  shippingZone?: Maybe<ShippingZone>;
  shippingErrors: Array<ShippingError>;
};

/** Deletes shipping prices. */
export type ShippingPriceBulkDelete = {
  __typename?: 'ShippingPriceBulkDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  shippingErrors: Array<ShippingError>;
};

/** Updates a new shipping price. */
export type ShippingPriceUpdate = {
  __typename?: 'ShippingPriceUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A shipping zone to which the shipping method belongs. */
  shippingZone?: Maybe<ShippingZone>;
  shippingErrors: Array<ShippingError>;
  shippingMethod?: Maybe<ShippingMethod>;
};

/** Creates/Updates translations for shipping method. */
export type ShippingPriceTranslate = {
  __typename?: 'ShippingPriceTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  translationErrors: Array<TranslationError>;
  shippingMethod?: Maybe<ShippingMethod>;
};

export type NameTranslationInput = {
  name?: Maybe<Scalars['String']>;
};

/** Creates a new shipping zone. */
export type ShippingZoneCreate = {
  __typename?: 'ShippingZoneCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  shippingErrors: Array<ShippingError>;
  shippingZone?: Maybe<ShippingZone>;
};

export type ShippingZoneCreateInput = {
  /** Shipping zone's name. Visible only to the staff. */
  name?: Maybe<Scalars['String']>;
  /** List of countries in this shipping zone. */
  countries?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Default shipping zone will be used for countries not covered by other zones. */
  default?: Maybe<Scalars['Boolean']>;
  /** List of warehouses to assign to a shipping zone */
  addWarehouses?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

/** Deletes a shipping zone. */
export type ShippingZoneDelete = {
  __typename?: 'ShippingZoneDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  shippingErrors: Array<ShippingError>;
  shippingZone?: Maybe<ShippingZone>;
};

/** Deletes shipping zones. */
export type ShippingZoneBulkDelete = {
  __typename?: 'ShippingZoneBulkDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  shippingErrors: Array<ShippingError>;
};

/** Updates a new shipping zone. */
export type ShippingZoneUpdate = {
  __typename?: 'ShippingZoneUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  shippingErrors: Array<ShippingError>;
  shippingZone?: Maybe<ShippingZone>;
};

export type ShippingZoneUpdateInput = {
  /** Shipping zone's name. Visible only to the staff. */
  name?: Maybe<Scalars['String']>;
  /** List of countries in this shipping zone. */
  countries?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Default shipping zone will be used for countries not covered by other zones. */
  default?: Maybe<Scalars['Boolean']>;
  /** List of warehouses to assign to a shipping zone */
  addWarehouses?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** List of warehouses to unassign from a shipping zone */
  removeWarehouses?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

/** Creates an attribute. */
export type AttributeCreate = {
  __typename?: 'AttributeCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  attribute?: Maybe<Attribute>;
  productErrors: Array<ProductError>;
};

export type ProductError = {
  __typename?: 'ProductError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: ProductErrorCode;
  /** List of attributes IDs which causes the error. */
  attributes?: Maybe<Array<Scalars['ID']>>;
};

/** An enumeration. */
export enum ProductErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  AttributeAlreadyAssigned = 'ATTRIBUTE_ALREADY_ASSIGNED',
  AttributeCannotBeAssigned = 'ATTRIBUTE_CANNOT_BE_ASSIGNED',
  AttributeVariantsDisabled = 'ATTRIBUTE_VARIANTS_DISABLED',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotProductsImage = 'NOT_PRODUCTS_IMAGE',
  NotProductsVariant = 'NOT_PRODUCTS_VARIANT',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE',
  VariantNoDigitalContent = 'VARIANT_NO_DIGITAL_CONTENT'
}

export type AttributeCreateInput = {
  /** The input type to use for entering attribute values in the dashboard. */
  inputType?: Maybe<AttributeInputTypeEnum>;
  /** Name of an attribute displayed in the interface. */
  name: Scalars['String'];
  /** Internal representation of an attribute name. */
  slug?: Maybe<Scalars['String']>;
  /** List of attribute's values. */
  values?: Maybe<Array<Maybe<AttributeValueCreateInput>>>;
  /** Whether the attribute requires values to be passed or not. */
  valueRequired?: Maybe<Scalars['Boolean']>;
  /** Whether the attribute is for variants only. */
  isVariantOnly?: Maybe<Scalars['Boolean']>;
  /** Whether the attribute should be visible or not in storefront. */
  visibleInStorefront?: Maybe<Scalars['Boolean']>;
  /** Whether the attribute can be filtered in storefront. */
  filterableInStorefront?: Maybe<Scalars['Boolean']>;
  /** Whether the attribute can be filtered in dashboard. */
  filterableInDashboard?: Maybe<Scalars['Boolean']>;
  /** The position of the attribute in the storefront navigation (0 by default). */
  storefrontSearchPosition?: Maybe<Scalars['Int']>;
  /** Whether the attribute can be displayed in the admin product list. */
  availableInGrid?: Maybe<Scalars['Boolean']>;
};

export type AttributeValueCreateInput = {
  /** Name of a value displayed in the interface. */
  name: Scalars['String'];
};

/** Deletes an attribute. */
export type AttributeDelete = {
  __typename?: 'AttributeDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  attribute?: Maybe<Attribute>;
};

/** Deletes attributes. */
export type AttributeBulkDelete = {
  __typename?: 'AttributeBulkDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  productErrors: Array<ProductError>;
};

/** Assign attributes to a given product type. */
export type AttributeAssign = {
  __typename?: 'AttributeAssign';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** The updated product type. */
  productType?: Maybe<ProductType>;
  productErrors: Array<ProductError>;
};

export type AttributeAssignInput = {
  /** The ID of the attribute to assign. */
  id: Scalars['ID'];
  /** The attribute type to be assigned as. */
  type: AttributeTypeEnum;
};

export enum AttributeTypeEnum {
  Product = 'PRODUCT',
  Variant = 'VARIANT'
}

/** Un-assign attributes from a given product type. */
export type AttributeUnassign = {
  __typename?: 'AttributeUnassign';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** The updated product type. */
  productType?: Maybe<ProductType>;
  productErrors: Array<ProductError>;
};

/** Updates attribute. */
export type AttributeUpdate = {
  __typename?: 'AttributeUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  attribute?: Maybe<Attribute>;
  productErrors: Array<ProductError>;
};

export type AttributeUpdateInput = {
  /** Name of an attribute displayed in the interface. */
  name?: Maybe<Scalars['String']>;
  /** Internal representation of an attribute name. */
  slug?: Maybe<Scalars['String']>;
  /** IDs of values to be removed from this attribute. */
  removeValues?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** New values to be created for this attribute. */
  addValues?: Maybe<Array<Maybe<AttributeValueCreateInput>>>;
  /** Whether the attribute requires values to be passed or not. */
  valueRequired?: Maybe<Scalars['Boolean']>;
  /** Whether the attribute is for variants only. */
  isVariantOnly?: Maybe<Scalars['Boolean']>;
  /** Whether the attribute should be visible or not in storefront. */
  visibleInStorefront?: Maybe<Scalars['Boolean']>;
  /** Whether the attribute can be filtered in storefront. */
  filterableInStorefront?: Maybe<Scalars['Boolean']>;
  /** Whether the attribute can be filtered in dashboard. */
  filterableInDashboard?: Maybe<Scalars['Boolean']>;
  /** The position of the attribute in the storefront navigation (0 by default). */
  storefrontSearchPosition?: Maybe<Scalars['Int']>;
  /** Whether the attribute can be displayed in the admin product list. */
  availableInGrid?: Maybe<Scalars['Boolean']>;
};

/** Creates/Updates translations for attribute. */
export type AttributeTranslate = {
  __typename?: 'AttributeTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  translationErrors: Array<TranslationError>;
  attribute?: Maybe<Attribute>;
};

/** Update public metadata for attribute. */
export type AttributeUpdateMeta = {
  __typename?: 'AttributeUpdateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  attribute?: Maybe<Attribute>;
};

export type MetaInput = {
  /** Name of metadata client group. */
  namespace: Scalars['String'];
  /** Metadata client's name. */
  clientName: Scalars['String'];
  /** Key for stored data. */
  key: Scalars['String'];
  /** Stored metadata value. */
  value: Scalars['String'];
};

/** Clears public metadata item for attribute. */
export type AttributeClearMeta = {
  __typename?: 'AttributeClearMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  attribute?: Maybe<Attribute>;
};

export type MetaPath = {
  /** Name of metadata client group. */
  namespace: Scalars['String'];
  /** Metadata client's name. */
  clientName: Scalars['String'];
  /** Key for stored data. */
  key: Scalars['String'];
};

/** Update public metadata for attribute. */
export type AttributeUpdatePrivateMeta = {
  __typename?: 'AttributeUpdatePrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  attribute?: Maybe<Attribute>;
};

/** Clears public metadata item for attribute. */
export type AttributeClearPrivateMeta = {
  __typename?: 'AttributeClearPrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  attribute?: Maybe<Attribute>;
};

/** Creates a value for an attribute. */
export type AttributeValueCreate = {
  __typename?: 'AttributeValueCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** The updated attribute. */
  attribute?: Maybe<Attribute>;
  productErrors: Array<ProductError>;
  attributeValue?: Maybe<AttributeValue>;
};

/** Deletes a value of an attribute. */
export type AttributeValueDelete = {
  __typename?: 'AttributeValueDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** The updated attribute. */
  attribute?: Maybe<Attribute>;
  productErrors: Array<ProductError>;
  attributeValue?: Maybe<AttributeValue>;
};

/** Deletes values of attributes. */
export type AttributeValueBulkDelete = {
  __typename?: 'AttributeValueBulkDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  productErrors: Array<ProductError>;
};

/** Updates value of an attribute. */
export type AttributeValueUpdate = {
  __typename?: 'AttributeValueUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** The updated attribute. */
  attribute?: Maybe<Attribute>;
  productErrors: Array<ProductError>;
  attributeValue?: Maybe<AttributeValue>;
};

/** Creates/Updates translations for attribute value. */
export type AttributeValueTranslate = {
  __typename?: 'AttributeValueTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  translationErrors: Array<TranslationError>;
  attributeValue?: Maybe<AttributeValue>;
};

/** Reorder the values of an attribute. */
export type AttributeReorderValues = {
  __typename?: 'AttributeReorderValues';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Attribute from which values are reordered. */
  attribute?: Maybe<Attribute>;
  productErrors: Array<ProductError>;
};

export type ReorderInput = {
  /** The ID of the item to move. */
  id: Scalars['ID'];
  /** The new relative sorting position of the item (from -inf to +inf). 1 moves the item one position forward, -1 moves the item one position backward, 0 leaves the item unchanged. */
  sortOrder?: Maybe<Scalars['Int']>;
};

/** Creates a new category. */
export type CategoryCreate = {
  __typename?: 'CategoryCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  category?: Maybe<Category>;
};

export type CategoryInput = {
  /** Category description (HTML/text). */
  description?: Maybe<Scalars['String']>;
  /** Category description (JSON). */
  descriptionJson?: Maybe<Scalars['JSONString']>;
  /** Category name. */
  name?: Maybe<Scalars['String']>;
  /** Category slug. */
  slug?: Maybe<Scalars['String']>;
  /** Search engine optimization fields. */
  seo?: Maybe<SeoInput>;
  /** Background image file. */
  backgroundImage?: Maybe<Scalars['Upload']>;
  /** Alt text for an image. */
  backgroundImageAlt?: Maybe<Scalars['String']>;
};

export type SeoInput = {
  /** SEO title. */
  title?: Maybe<Scalars['String']>;
  /** SEO description. */
  description?: Maybe<Scalars['String']>;
};


/** Deletes a category. */
export type CategoryDelete = {
  __typename?: 'CategoryDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  category?: Maybe<Category>;
};

/** Deletes categories. */
export type CategoryBulkDelete = {
  __typename?: 'CategoryBulkDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  productErrors: Array<ProductError>;
};

/** Updates a category. */
export type CategoryUpdate = {
  __typename?: 'CategoryUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  category?: Maybe<Category>;
};

/** Creates/Updates translations for Category. */
export type CategoryTranslate = {
  __typename?: 'CategoryTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  translationErrors: Array<TranslationError>;
  category?: Maybe<Category>;
};

export type TranslationInput = {
  seoTitle?: Maybe<Scalars['String']>;
  seoDescription?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  descriptionJson?: Maybe<Scalars['JSONString']>;
};

/** Update public metadata for category. */
export type CategoryUpdateMeta = {
  __typename?: 'CategoryUpdateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  category?: Maybe<Category>;
};

/** Clears public metadata for category. */
export type CategoryClearMeta = {
  __typename?: 'CategoryClearMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  category?: Maybe<Category>;
};

/** Update private metadata for category. */
export type CategoryUpdatePrivateMeta = {
  __typename?: 'CategoryUpdatePrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  category?: Maybe<Category>;
};

/** Clears private metadata for category. */
export type CategoryClearPrivateMeta = {
  __typename?: 'CategoryClearPrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  category?: Maybe<Category>;
};

/** Adds products to a collection. */
export type CollectionAddProducts = {
  __typename?: 'CollectionAddProducts';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Collection to which products will be added. */
  collection?: Maybe<Collection>;
  productErrors: Array<ProductError>;
};

/** Creates a new collection. */
export type CollectionCreate = {
  __typename?: 'CollectionCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  collection?: Maybe<Collection>;
};

export type CollectionCreateInput = {
  /** Informs whether a collection is published. */
  isPublished?: Maybe<Scalars['Boolean']>;
  /** Name of the collection. */
  name?: Maybe<Scalars['String']>;
  /** Slug of the collection. */
  slug?: Maybe<Scalars['String']>;
  /** Description of the collection (HTML/text). */
  description?: Maybe<Scalars['String']>;
  /** Description of the collection (JSON). */
  descriptionJson?: Maybe<Scalars['JSONString']>;
  /** Background image file. */
  backgroundImage?: Maybe<Scalars['Upload']>;
  /** Alt text for an image. */
  backgroundImageAlt?: Maybe<Scalars['String']>;
  /** Search engine optimization fields. */
  seo?: Maybe<SeoInput>;
  /** Publication date. ISO 8601 standard. */
  publicationDate?: Maybe<Scalars['Date']>;
  /** List of products to be added to the collection. */
  products?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

/** Deletes a collection. */
export type CollectionDelete = {
  __typename?: 'CollectionDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  collection?: Maybe<Collection>;
};

/** Reorder the products of a collection. */
export type CollectionReorderProducts = {
  __typename?: 'CollectionReorderProducts';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Collection from which products are reordered. */
  collection?: Maybe<Collection>;
  productErrors: Array<ProductError>;
};

export type MoveProductInput = {
  /** The ID of the product to move. */
  productId: Scalars['ID'];
  /** The relative sorting position of the product (from -inf to +inf) starting from the first given product's actual position.1 moves the item one position forward, -1 moves the item one position backward, 0 leaves the item unchanged. */
  sortOrder?: Maybe<Scalars['Int']>;
};

/** Deletes collections. */
export type CollectionBulkDelete = {
  __typename?: 'CollectionBulkDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  productErrors: Array<ProductError>;
};

/** Publish collections. */
export type CollectionBulkPublish = {
  __typename?: 'CollectionBulkPublish';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  productErrors: Array<ProductError>;
};

/** Remove products from a collection. */
export type CollectionRemoveProducts = {
  __typename?: 'CollectionRemoveProducts';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Collection from which products will be removed. */
  collection?: Maybe<Collection>;
  productErrors: Array<ProductError>;
};

/** Updates a collection. */
export type CollectionUpdate = {
  __typename?: 'CollectionUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  collection?: Maybe<Collection>;
};

export type CollectionInput = {
  /** Informs whether a collection is published. */
  isPublished?: Maybe<Scalars['Boolean']>;
  /** Name of the collection. */
  name?: Maybe<Scalars['String']>;
  /** Slug of the collection. */
  slug?: Maybe<Scalars['String']>;
  /** Description of the collection (HTML/text). */
  description?: Maybe<Scalars['String']>;
  /** Description of the collection (JSON). */
  descriptionJson?: Maybe<Scalars['JSONString']>;
  /** Background image file. */
  backgroundImage?: Maybe<Scalars['Upload']>;
  /** Alt text for an image. */
  backgroundImageAlt?: Maybe<Scalars['String']>;
  /** Search engine optimization fields. */
  seo?: Maybe<SeoInput>;
  /** Publication date. ISO 8601 standard. */
  publicationDate?: Maybe<Scalars['Date']>;
};

/** Creates/Updates translations for collection. */
export type CollectionTranslate = {
  __typename?: 'CollectionTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  translationErrors: Array<TranslationError>;
  collection?: Maybe<Collection>;
};

/** Update public metadata for collection. */
export type CollectionUpdateMeta = {
  __typename?: 'CollectionUpdateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  collection?: Maybe<Collection>;
};

/** Clears public metadata for collection. */
export type CollectionClearMeta = {
  __typename?: 'CollectionClearMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  collection?: Maybe<Collection>;
};

/** Update private metadata for collection. */
export type CollectionUpdatePrivateMeta = {
  __typename?: 'CollectionUpdatePrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  collection?: Maybe<Collection>;
};

/** Clears private metadata item for collection. */
export type CollectionClearPrivateMeta = {
  __typename?: 'CollectionClearPrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  collection?: Maybe<Collection>;
};

/** Creates a new product. */
export type ProductCreate = {
  __typename?: 'ProductCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  product?: Maybe<Product>;
};

export type ProductCreateInput = {
  /** List of attributes. */
  attributes?: Maybe<Array<Maybe<AttributeValueInput>>>;
  /** Publication date. ISO 8601 standard. */
  publicationDate?: Maybe<Scalars['Date']>;
  /** ID of the product's category. */
  category?: Maybe<Scalars['ID']>;
  /** Determine if taxes are being charged for the product. */
  chargeTaxes?: Maybe<Scalars['Boolean']>;
  /** List of IDs of collections that the product belongs to. */
  collections?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Product description (HTML/text). */
  description?: Maybe<Scalars['String']>;
  /** Product description (JSON). */
  descriptionJson?: Maybe<Scalars['JSONString']>;
  /** Determines if product is visible to customers. */
  isPublished?: Maybe<Scalars['Boolean']>;
  /** Product name. */
  name?: Maybe<Scalars['String']>;
  /** Product slug. */
  slug?: Maybe<Scalars['String']>;
  /** Tax rate for enabled tax gateway. */
  taxCode?: Maybe<Scalars['String']>;
  /** Search engine optimization fields. */
  seo?: Maybe<SeoInput>;
  /** Weight of the Product. */
  weight?: Maybe<Scalars['WeightScalar']>;
  /** Stock keeping unit of a product. Note: this field is only used if a product doesn't use variants. */
  sku?: Maybe<Scalars['String']>;
  /** Determines if the inventory of this product should be tracked. If false, the quantity won't change when customers buy this item. Note: this field is only used if a product doesn't use variants. */
  trackInventory?: Maybe<Scalars['Boolean']>;
  /** Default price for product variant. Note: this field is only used if a product doesn't use variants. */
  basePrice?: Maybe<Scalars['PositiveDecimal']>;
  /** Determines if product is visible in product listings (doesn't apply to product collections). */
  visibleInListings?: Maybe<Scalars['Boolean']>;
  /** ID of the type that product belongs to. */
  productType: Scalars['ID'];
  /** Stocks of a product available for sale. Note: this field is only used if a product doesn't use variants. */
  stocks?: Maybe<Array<StockInput>>;
};

export type AttributeValueInput = {
  /** ID of the selected attribute. */
  id?: Maybe<Scalars['ID']>;
  /** The value or slug of an attribute to resolve. If the passed value is non-existent, it will be created. */
  values: Array<Maybe<Scalars['String']>>;
};

export type StockInput = {
  /** Warehouse in which stock is located. */
  warehouse: Scalars['ID'];
  /** Quantity of items available for sell. */
  quantity?: Maybe<Scalars['Int']>;
};

/** Deletes a product. */
export type ProductDelete = {
  __typename?: 'ProductDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  product?: Maybe<Product>;
};

/** Deletes products. */
export type ProductBulkDelete = {
  __typename?: 'ProductBulkDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  productErrors: Array<ProductError>;
};

/** Publish products. */
export type ProductBulkPublish = {
  __typename?: 'ProductBulkPublish';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  productErrors: Array<ProductError>;
};

/** Updates an existing product. */
export type ProductUpdate = {
  __typename?: 'ProductUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  product?: Maybe<Product>;
};

export type ProductInput = {
  /** List of attributes. */
  attributes?: Maybe<Array<Maybe<AttributeValueInput>>>;
  /** Publication date. ISO 8601 standard. */
  publicationDate?: Maybe<Scalars['Date']>;
  /** ID of the product's category. */
  category?: Maybe<Scalars['ID']>;
  /** Determine if taxes are being charged for the product. */
  chargeTaxes?: Maybe<Scalars['Boolean']>;
  /** List of IDs of collections that the product belongs to. */
  collections?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Product description (HTML/text). */
  description?: Maybe<Scalars['String']>;
  /** Product description (JSON). */
  descriptionJson?: Maybe<Scalars['JSONString']>;
  /** Determines if product is visible to customers. */
  isPublished?: Maybe<Scalars['Boolean']>;
  /** Product name. */
  name?: Maybe<Scalars['String']>;
  /** Product slug. */
  slug?: Maybe<Scalars['String']>;
  /** Tax rate for enabled tax gateway. */
  taxCode?: Maybe<Scalars['String']>;
  /** Search engine optimization fields. */
  seo?: Maybe<SeoInput>;
  /** Weight of the Product. */
  weight?: Maybe<Scalars['WeightScalar']>;
  /** Stock keeping unit of a product. Note: this field is only used if a product doesn't use variants. */
  sku?: Maybe<Scalars['String']>;
  /** Determines if the inventory of this product should be tracked. If false, the quantity won't change when customers buy this item. Note: this field is only used if a product doesn't use variants. */
  trackInventory?: Maybe<Scalars['Boolean']>;
  /** Default price for product variant. Note: this field is only used if a product doesn't use variants. */
  basePrice?: Maybe<Scalars['PositiveDecimal']>;
  /** Determines if product is visible in product listings (doesn't apply to product collections). */
  visibleInListings?: Maybe<Scalars['Boolean']>;
};

/** Creates/Updates translations for Product. */
export type ProductTranslate = {
  __typename?: 'ProductTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  translationErrors: Array<TranslationError>;
  product?: Maybe<Product>;
};

/** Update public metadata for product. */
export type ProductUpdateMeta = {
  __typename?: 'ProductUpdateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  product?: Maybe<Product>;
};

/** Clears public metadata item for product. */
export type ProductClearMeta = {
  __typename?: 'ProductClearMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  product?: Maybe<Product>;
};

/** Update private metadata for product. */
export type ProductUpdatePrivateMeta = {
  __typename?: 'ProductUpdatePrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  product?: Maybe<Product>;
};

/** Clears private metadata item for product. */
export type ProductClearPrivateMeta = {
  __typename?: 'ProductClearPrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  product?: Maybe<Product>;
};

/** Set product availability for purchase date. */
export type ProductSetAvailabilityForPurchase = {
  __typename?: 'ProductSetAvailabilityForPurchase';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

/** Create a product image. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec */
export type ProductImageCreate = {
  __typename?: 'ProductImageCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  product?: Maybe<Product>;
  image?: Maybe<ProductImage>;
  productErrors: Array<ProductError>;
};

export type ProductImageCreateInput = {
  /** Alt text for an image. */
  alt?: Maybe<Scalars['String']>;
  /** Represents an image file in a multipart request. */
  image: Scalars['Upload'];
  /** ID of an product. */
  product: Scalars['ID'];
};

/** Reorder the variants of a product. Mutation updates updated_at on product and triggers PRODUCT_UPDATED webhook. */
export type ProductVariantReorder = {
  __typename?: 'ProductVariantReorder';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

/** Deletes a product image. */
export type ProductImageDelete = {
  __typename?: 'ProductImageDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  product?: Maybe<Product>;
  image?: Maybe<ProductImage>;
  productErrors: Array<ProductError>;
};

/** Deletes product images. */
export type ProductImageBulkDelete = {
  __typename?: 'ProductImageBulkDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  productErrors: Array<ProductError>;
};

/** Changes ordering of the product image. */
export type ProductImageReorder = {
  __typename?: 'ProductImageReorder';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  product?: Maybe<Product>;
  images?: Maybe<Array<Maybe<ProductImage>>>;
  productErrors: Array<ProductError>;
};

/** Updates a product image. */
export type ProductImageUpdate = {
  __typename?: 'ProductImageUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  product?: Maybe<Product>;
  image?: Maybe<ProductImage>;
  productErrors: Array<ProductError>;
};

export type ProductImageUpdateInput = {
  /** Alt text for an image. */
  alt?: Maybe<Scalars['String']>;
};

/** Creates a new product type. */
export type ProductTypeCreate = {
  __typename?: 'ProductTypeCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productType?: Maybe<ProductType>;
};

export type ProductTypeInput = {
  /** Name of the product type. */
  name?: Maybe<Scalars['String']>;
  /** Product type slug. */
  slug?: Maybe<Scalars['String']>;
  /** Determines if product of this type has multiple variants. This option mainly simplifies product management in the dashboard. There is always at least one variant created under the hood. */
  hasVariants?: Maybe<Scalars['Boolean']>;
  /** List of attributes shared among all product variants. */
  productAttributes?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** List of attributes used to distinguish between different variants of a product. */
  variantAttributes?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Determines if shipping is required for products of this variant. */
  isShippingRequired?: Maybe<Scalars['Boolean']>;
  /** Determines if products are digital. */
  isDigital?: Maybe<Scalars['Boolean']>;
  /** Weight of the ProductType items. */
  weight?: Maybe<Scalars['WeightScalar']>;
  /** Tax rate for enabled tax gateway. */
  taxCode?: Maybe<Scalars['String']>;
};

/** Deletes a product type. */
export type ProductTypeDelete = {
  __typename?: 'ProductTypeDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productType?: Maybe<ProductType>;
};

/** Deletes product types. */
export type ProductTypeBulkDelete = {
  __typename?: 'ProductTypeBulkDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  productErrors: Array<ProductError>;
};

/** Updates an existing product type. */
export type ProductTypeUpdate = {
  __typename?: 'ProductTypeUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productType?: Maybe<ProductType>;
};

/** Reorder the attributes of a product type. */
export type ProductTypeReorderAttributes = {
  __typename?: 'ProductTypeReorderAttributes';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Product type from which attributes are reordered. */
  productType?: Maybe<ProductType>;
  productErrors: Array<ProductError>;
};

/** Update public metadata for product type. */
export type ProductTypeUpdateMeta = {
  __typename?: 'ProductTypeUpdateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productType?: Maybe<ProductType>;
};

/** Clears public metadata for product type. */
export type ProductTypeClearMeta = {
  __typename?: 'ProductTypeClearMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productType?: Maybe<ProductType>;
};

/** Update private metadata for product type. */
export type ProductTypeUpdatePrivateMeta = {
  __typename?: 'ProductTypeUpdatePrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productType?: Maybe<ProductType>;
};

/** Clears private metadata for product type. */
export type ProductTypeClearPrivateMeta = {
  __typename?: 'ProductTypeClearPrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productType?: Maybe<ProductType>;
};

/** Create new digital content. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec */
export type DigitalContentCreate = {
  __typename?: 'DigitalContentCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  variant?: Maybe<ProductVariant>;
  content?: Maybe<DigitalContent>;
  productErrors: Array<ProductError>;
};

export type DigitalContentUploadInput = {
  /** Use default digital content settings for this product. */
  useDefaultSettings: Scalars['Boolean'];
  /** Determines how many times a download link can be accessed by a customer. */
  maxDownloads?: Maybe<Scalars['Int']>;
  /** Determines for how many days a download link is active since it was generated. */
  urlValidDays?: Maybe<Scalars['Int']>;
  /** Overwrite default automatic_fulfillment setting for variant. */
  automaticFulfillment?: Maybe<Scalars['Boolean']>;
  /** Represents an file in a multipart request. */
  contentFile: Scalars['Upload'];
};

/** Remove digital content assigned to given variant. */
export type DigitalContentDelete = {
  __typename?: 'DigitalContentDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  variant?: Maybe<ProductVariant>;
  productErrors: Array<ProductError>;
};

/** Update digital content. */
export type DigitalContentUpdate = {
  __typename?: 'DigitalContentUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  variant?: Maybe<ProductVariant>;
  content?: Maybe<DigitalContent>;
  productErrors: Array<ProductError>;
};

export type DigitalContentInput = {
  /** Use default digital content settings for this product. */
  useDefaultSettings: Scalars['Boolean'];
  /** Determines how many times a download link can be accessed by a customer. */
  maxDownloads?: Maybe<Scalars['Int']>;
  /** Determines for how many days a download link is active since it was generated. */
  urlValidDays?: Maybe<Scalars['Int']>;
  /** Overwrite default automatic_fulfillment setting for variant. */
  automaticFulfillment?: Maybe<Scalars['Boolean']>;
};

/** Generate new URL to digital content. */
export type DigitalContentUrlCreate = {
  __typename?: 'DigitalContentUrlCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  digitalContentUrl?: Maybe<DigitalContentUrl>;
};

export type DigitalContentUrlCreateInput = {
  /** Digital content ID which URL will belong to. */
  content: Scalars['ID'];
};

/** Creates a new variant for a product. */
export type ProductVariantCreate = {
  __typename?: 'ProductVariantCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

export type ProductVariantCreateInput = {
  /** List of attributes specific to this variant. */
  attributes: Array<Maybe<AttributeValueInput>>;
  /** Cost price of the variant. */
  costPrice?: Maybe<Scalars['PositiveDecimal']>;
  /** Price of the particular variant. */
  price?: Maybe<Scalars['PositiveDecimal']>;
  /** Stock keeping unit. */
  sku?: Maybe<Scalars['String']>;
  /** Determines if the inventory of this variant should be tracked. If false, the quantity won't change when customers buy this item. */
  trackInventory?: Maybe<Scalars['Boolean']>;
  /** Weight of the Product Variant. */
  weight?: Maybe<Scalars['WeightScalar']>;
  /** Product ID of which type is the variant. */
  product: Scalars['ID'];
  /** Stocks of a product available for sale. */
  stocks?: Maybe<Array<StockInput>>;
};

/** Deletes a product variant. */
export type ProductVariantDelete = {
  __typename?: 'ProductVariantDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

/** Creates product variants for a given product. */
export type ProductVariantBulkCreate = {
  __typename?: 'ProductVariantBulkCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were created. */
  count: Scalars['Int'];
  /** List of the created variants. */
  productVariants: Array<ProductVariant>;
  bulkProductErrors: Array<BulkProductError>;
};

export type BulkProductError = {
  __typename?: 'BulkProductError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: ProductErrorCode;
  /** List of attributes IDs which causes the error. */
  attributes?: Maybe<Array<Scalars['ID']>>;
  /** Index of an input list item that caused the error. */
  index?: Maybe<Scalars['Int']>;
  /** List of warehouse IDs which causes the error. */
  warehouses?: Maybe<Array<Scalars['ID']>>;
};

export type ProductVariantBulkCreateInput = {
  /** List of attributes specific to this variant. */
  attributes: Array<Maybe<AttributeValueInput>>;
  /** Cost price of the variant. */
  costPrice?: Maybe<Scalars['PositiveDecimal']>;
  /** Price of the particular variant. */
  price?: Maybe<Scalars['PositiveDecimal']>;
  /** Stock keeping unit. */
  sku: Scalars['String'];
  /** Determines if the inventory of this variant should be tracked. If false, the quantity won't change when customers buy this item. */
  trackInventory?: Maybe<Scalars['Boolean']>;
  /** Weight of the Product Variant. */
  weight?: Maybe<Scalars['WeightScalar']>;
  /** Stocks of a product available for sale. */
  stocks?: Maybe<Array<StockInput>>;
};

/** Deletes product variants. */
export type ProductVariantBulkDelete = {
  __typename?: 'ProductVariantBulkDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  productErrors: Array<ProductError>;
};

/** Creates stocks for product variant. */
export type ProductVariantStocksCreate = {
  __typename?: 'ProductVariantStocksCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated product variant. */
  productVariant?: Maybe<ProductVariant>;
  bulkStockErrors: Array<BulkStockError>;
};

export type BulkStockError = {
  __typename?: 'BulkStockError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: ProductErrorCode;
  /** List of attributes IDs which causes the error. */
  attributes?: Maybe<Array<Scalars['ID']>>;
  /** Index of an input list item that caused the error. */
  index?: Maybe<Scalars['Int']>;
};

/** Delete stocks from product variant. */
export type ProductVariantStocksDelete = {
  __typename?: 'ProductVariantStocksDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated product variant. */
  productVariant?: Maybe<ProductVariant>;
  stockErrors: Array<StockError>;
};

export type StockError = {
  __typename?: 'StockError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: StockErrorCode;
};

/** An enumeration. */
export enum StockErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

/** Update stocks for product variant. */
export type ProductVariantStocksUpdate = {
  __typename?: 'ProductVariantStocksUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated product variant. */
  productVariant?: Maybe<ProductVariant>;
  bulkStockErrors: Array<BulkStockError>;
};

/** Updates an existing variant for product. */
export type ProductVariantUpdate = {
  __typename?: 'ProductVariantUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

export type ProductVariantInput = {
  /** List of attributes specific to this variant. */
  attributes?: Maybe<Array<Maybe<AttributeValueInput>>>;
  /** Cost price of the variant. */
  costPrice?: Maybe<Scalars['PositiveDecimal']>;
  /** Price of the particular variant. */
  price?: Maybe<Scalars['PositiveDecimal']>;
  /** Stock keeping unit. */
  sku?: Maybe<Scalars['String']>;
  /** Determines if the inventory of this variant should be tracked. If false, the quantity won't change when customers buy this item. */
  trackInventory?: Maybe<Scalars['Boolean']>;
  /** Weight of the Product Variant. */
  weight?: Maybe<Scalars['WeightScalar']>;
};

/** Set default variant for a product. Mutation triggers PRODUCT_UPDATED webhook. */
export type ProductVariantSetDefault = {
  __typename?: 'ProductVariantSetDefault';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  product?: Maybe<Product>;
  productErrors: Array<ProductError>;
};

/** Creates/Updates translations for Product Variant. */
export type ProductVariantTranslate = {
  __typename?: 'ProductVariantTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  translationErrors: Array<TranslationError>;
  productVariant?: Maybe<ProductVariant>;
};

/** Update public metadata for product variant. */
export type ProductVariantUpdateMeta = {
  __typename?: 'ProductVariantUpdateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

/** Clears public metadata for product variant. */
export type ProductVariantClearMeta = {
  __typename?: 'ProductVariantClearMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

/** Update private metadata for product variant. */
export type ProductVariantUpdatePrivateMeta = {
  __typename?: 'ProductVariantUpdatePrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

/** Clears private metadata for product variant. */
export type ProductVariantClearPrivateMeta = {
  __typename?: 'ProductVariantClearPrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productErrors: Array<ProductError>;
  productVariant?: Maybe<ProductVariant>;
};

/** Assign an image to a product variant. */
export type VariantImageAssign = {
  __typename?: 'VariantImageAssign';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productVariant?: Maybe<ProductVariant>;
  image?: Maybe<ProductImage>;
  productErrors: Array<ProductError>;
};

/** Unassign an image from a product variant. */
export type VariantImageUnassign = {
  __typename?: 'VariantImageUnassign';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  productVariant?: Maybe<ProductVariant>;
  image?: Maybe<ProductImage>;
  productErrors: Array<ProductError>;
};

/** Captures the authorized payment amount. */
export type PaymentCapture = {
  __typename?: 'PaymentCapture';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated payment. */
  payment?: Maybe<Payment>;
  paymentErrors: Array<PaymentError>;
};

export type PaymentError = {
  __typename?: 'PaymentError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: PaymentErrorCode;
};

/** An enumeration. */
export enum PaymentErrorCode {
  BillingAddressNotSet = 'BILLING_ADDRESS_NOT_SET',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE',
  PartialPaymentNotAllowed = 'PARTIAL_PAYMENT_NOT_ALLOWED',
  ShippingAddressNotSet = 'SHIPPING_ADDRESS_NOT_SET',
  InvalidShippingMethod = 'INVALID_SHIPPING_METHOD',
  ShippingMethodNotSet = 'SHIPPING_METHOD_NOT_SET',
  PaymentError = 'PAYMENT_ERROR',
  NotSupportedGateway = 'NOT_SUPPORTED_GATEWAY'
}

/** Refunds the captured payment amount. */
export type PaymentRefund = {
  __typename?: 'PaymentRefund';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated payment. */
  payment?: Maybe<Payment>;
  paymentErrors: Array<PaymentError>;
};

/** Voids the authorized payment. */
export type PaymentVoid = {
  __typename?: 'PaymentVoid';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Updated payment. */
  payment?: Maybe<Payment>;
  paymentErrors: Array<PaymentError>;
};

/** Initializes payment process when it is required by gateway. */
export type PaymentInitialize = {
  __typename?: 'PaymentInitialize';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  initializedPayment?: Maybe<PaymentInitialized>;
  paymentErrors: Array<PaymentError>;
};

/** Server-side data generated by a payment gateway. Optional step when the payment provider requires an additional action to initialize payment session. */
export type PaymentInitialized = {
  __typename?: 'PaymentInitialized';
  /** ID of a payment gateway. */
  gateway: Scalars['String'];
  /** Payment gateway name. */
  name: Scalars['String'];
  /** Initialized data by gateway. */
  data?: Maybe<Scalars['JSONString']>;
};

/** Creates a new page. */
export type PageCreate = {
  __typename?: 'PageCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  pageErrors: Array<PageError>;
  page?: Maybe<Page>;
};

export type PageError = {
  __typename?: 'PageError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: PageErrorCode;
};

/** An enumeration. */
export enum PageErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type PageInput = {
  /** Page internal name. */
  slug?: Maybe<Scalars['String']>;
  /** Page title. */
  title?: Maybe<Scalars['String']>;
  /** Page content. May consist of ordinary text, HTML and images. */
  content?: Maybe<Scalars['String']>;
  /** Page content in JSON format. */
  contentJson?: Maybe<Scalars['JSONString']>;
  /** Determines if page is visible in the storefront. */
  isPublished?: Maybe<Scalars['Boolean']>;
  /** Publication date. ISO 8601 standard. */
  publicationDate?: Maybe<Scalars['String']>;
  /** Search engine optimization fields. */
  seo?: Maybe<SeoInput>;
};

/** Deletes a page. */
export type PageDelete = {
  __typename?: 'PageDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  pageErrors: Array<PageError>;
  page?: Maybe<Page>;
};

/** Deletes pages. */
export type PageBulkDelete = {
  __typename?: 'PageBulkDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  pageErrors: Array<PageError>;
};

/** Publish pages. */
export type PageBulkPublish = {
  __typename?: 'PageBulkPublish';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  pageErrors: Array<PageError>;
};

/** Updates an existing page. */
export type PageUpdate = {
  __typename?: 'PageUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  pageErrors: Array<PageError>;
  page?: Maybe<Page>;
};

/** Creates/Updates translations for Page. */
export type PageTranslate = {
  __typename?: 'PageTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  translationErrors: Array<TranslationError>;
  page?: Maybe<PageTranslatableContent>;
};

export type PageTranslationInput = {
  seoTitle?: Maybe<Scalars['String']>;
  seoDescription?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  contentJson?: Maybe<Scalars['JSONString']>;
};

/** Completes creating an order. */
export type DraftOrderComplete = {
  __typename?: 'DraftOrderComplete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Completed order. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

export type OrderError = {
  __typename?: 'OrderError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: OrderErrorCode;
  /** Warehouse ID which causes the error. */
  warehouse?: Maybe<Scalars['ID']>;
  /** Order line ID which causes the error. */
  orderLine?: Maybe<Scalars['ID']>;
};

/** An enumeration. */
export enum OrderErrorCode {
  BillingAddressNotSet = 'BILLING_ADDRESS_NOT_SET',
  CannotCancelFulfillment = 'CANNOT_CANCEL_FULFILLMENT',
  CannotCancelOrder = 'CANNOT_CANCEL_ORDER',
  CannotDelete = 'CANNOT_DELETE',
  CannotRefund = 'CANNOT_REFUND',
  CaptureInactivePayment = 'CAPTURE_INACTIVE_PAYMENT',
  NotEditable = 'NOT_EDITABLE',
  FulfillOrderLine = 'FULFILL_ORDER_LINE',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  ProductNotPublished = 'PRODUCT_NOT_PUBLISHED',
  ProductUnavailableForPurchase = 'PRODUCT_UNAVAILABLE_FOR_PURCHASE',
  NotFound = 'NOT_FOUND',
  OrderNoShippingAddress = 'ORDER_NO_SHIPPING_ADDRESS',
  PaymentError = 'PAYMENT_ERROR',
  PaymentMissing = 'PAYMENT_MISSING',
  Required = 'REQUIRED',
  ShippingMethodNotApplicable = 'SHIPPING_METHOD_NOT_APPLICABLE',
  ShippingMethodRequired = 'SHIPPING_METHOD_REQUIRED',
  TaxError = 'TAX_ERROR',
  Unique = 'UNIQUE',
  VoidInactivePayment = 'VOID_INACTIVE_PAYMENT',
  ZeroQuantity = 'ZERO_QUANTITY',
  InsufficientStock = 'INSUFFICIENT_STOCK',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM'
}

/** Creates a new draft order. */
export type DraftOrderCreate = {
  __typename?: 'DraftOrderCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  orderErrors: Array<OrderError>;
  order?: Maybe<Order>;
};

export type DraftOrderCreateInput = {
  /** Billing address of the customer. */
  billingAddress?: Maybe<AddressInput>;
  user?: Maybe<Scalars['ID']>;
  /** Email address of the customer. */
  userEmail?: Maybe<Scalars['String']>;
  /** Discount amount for the order. */
  discount?: Maybe<Scalars['PositiveDecimal']>;
  /** Shipping address of the customer. */
  shippingAddress?: Maybe<AddressInput>;
  /** ID of a selected shipping method. */
  shippingMethod?: Maybe<Scalars['ID']>;
  /** ID of the voucher associated with the order. */
  voucher?: Maybe<Scalars['ID']>;
  /** A note from a customer. Visible by customers in the order summary. */
  customerNote?: Maybe<Scalars['String']>;
  /** Variant line input consisting of variant ID and quantity of products. */
  lines?: Maybe<Array<Maybe<OrderLineCreateInput>>>;
};

export type OrderLineCreateInput = {
  /** Number of variant items ordered. */
  quantity: Scalars['Int'];
  /** Product variant ID. */
  variantId: Scalars['ID'];
};

/** Deletes a draft order. */
export type DraftOrderDelete = {
  __typename?: 'DraftOrderDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  orderErrors: Array<OrderError>;
  order?: Maybe<Order>;
};

/** Deletes draft orders. */
export type DraftOrderBulkDelete = {
  __typename?: 'DraftOrderBulkDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  orderErrors: Array<OrderError>;
};

/** Deletes order lines. */
export type DraftOrderLinesBulkDelete = {
  __typename?: 'DraftOrderLinesBulkDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  orderErrors: Array<OrderError>;
};

/** Create order lines for a draft order. */
export type DraftOrderLinesCreate = {
  __typename?: 'DraftOrderLinesCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A related draft order. */
  order?: Maybe<Order>;
  /** List of newly added order lines. */
  orderLines?: Maybe<Array<OrderLine>>;
  orderErrors: Array<OrderError>;
};

/** Deletes an order line from a draft order. */
export type DraftOrderLineDelete = {
  __typename?: 'DraftOrderLineDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A related draft order. */
  order?: Maybe<Order>;
  /** An order line that was deleted. */
  orderLine?: Maybe<OrderLine>;
  orderErrors: Array<OrderError>;
};

/** Updates an order line of a draft order. */
export type DraftOrderLineUpdate = {
  __typename?: 'DraftOrderLineUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A related draft order. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
  orderLine?: Maybe<OrderLine>;
};

export type OrderLineInput = {
  /** Number of variant items ordered. */
  quantity: Scalars['Int'];
};

/** Updates a draft order. */
export type DraftOrderUpdate = {
  __typename?: 'DraftOrderUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  orderErrors: Array<OrderError>;
  order?: Maybe<Order>;
};

export type DraftOrderInput = {
  /** Billing address of the customer. */
  billingAddress?: Maybe<AddressInput>;
  user?: Maybe<Scalars['ID']>;
  /** Email address of the customer. */
  userEmail?: Maybe<Scalars['String']>;
  /** Discount amount for the order. */
  discount?: Maybe<Scalars['PositiveDecimal']>;
  /** Shipping address of the customer. */
  shippingAddress?: Maybe<AddressInput>;
  /** ID of a selected shipping method. */
  shippingMethod?: Maybe<Scalars['ID']>;
  /** ID of the voucher associated with the order. */
  voucher?: Maybe<Scalars['ID']>;
  /** A note from a customer. Visible by customers in the order summary. */
  customerNote?: Maybe<Scalars['String']>;
};

/** Adds note to the order. */
export type OrderAddNote = {
  __typename?: 'OrderAddNote';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Order with the note added. */
  order?: Maybe<Order>;
  /** Order note created. */
  event?: Maybe<OrderEvent>;
  orderErrors: Array<OrderError>;
};

export type OrderAddNoteInput = {
  /** Note message. */
  message: Scalars['String'];
};

/** Cancel an order. */
export type OrderCancel = {
  __typename?: 'OrderCancel';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Canceled order. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

/** Capture an order. */
export type OrderCapture = {
  __typename?: 'OrderCapture';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Captured order. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

/** Clears stored private metadata value. */
export type OrderClearPrivateMeta = {
  __typename?: 'OrderClearPrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  order?: Maybe<Order>;
};

/** Clears stored metadata value. */
export type OrderClearMeta = {
  __typename?: 'OrderClearMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  order?: Maybe<Order>;
};

/** Creates new fulfillments for an order. */
export type OrderFulfill = {
  __typename?: 'OrderFulfill';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** List of created fulfillments. */
  fulfillments?: Maybe<Array<Maybe<Fulfillment>>>;
  /** Fulfilled order. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

export type OrderFulfillInput = {
  /** List of items informing how to fulfill the order. */
  lines: Array<OrderFulfillLineInput>;
  /** If true, send an email notification to the customer. */
  notifyCustomer?: Maybe<Scalars['Boolean']>;
};

export type OrderFulfillLineInput = {
  /** The ID of the order line. */
  orderLineId?: Maybe<Scalars['ID']>;
  /** List of stock items to create. */
  stocks: Array<OrderFulfillStockInput>;
};

export type OrderFulfillStockInput = {
  /** The number of line items to be fulfilled from given warehouse. */
  quantity: Scalars['Int'];
  /** ID of the warehouse from which the item will be fulfilled. */
  warehouse: Scalars['ID'];
};

/** Cancels existing fulfillment and optionally restocks items. */
export type FulfillmentCancel = {
  __typename?: 'FulfillmentCancel';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A canceled fulfillment. */
  fulfillment?: Maybe<Fulfillment>;
  /** Order which fulfillment was cancelled. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

export type FulfillmentCancelInput = {
  /** ID of warehouse where items will be restock. */
  warehouseId: Scalars['ID'];
};

/** Updates a fulfillment for an order. */
export type FulfillmentUpdateTracking = {
  __typename?: 'FulfillmentUpdateTracking';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A fulfillment with updated tracking. */
  fulfillment?: Maybe<Fulfillment>;
  /** Order for which fulfillment was updated. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

export type FulfillmentUpdateTrackingInput = {
  /** Fulfillment tracking number. */
  trackingNumber?: Maybe<Scalars['String']>;
  /** If true, send an email notification to the customer. */
  notifyCustomer?: Maybe<Scalars['Boolean']>;
};

/** Clears metadata for fulfillment. */
export type FulfillmentClearMeta = {
  __typename?: 'FulfillmentClearMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  fulfillment?: Maybe<Fulfillment>;
};

/** Clears private metadata for fulfillment. */
export type FulfillmentClearPrivateMeta = {
  __typename?: 'FulfillmentClearPrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  fulfillment?: Maybe<Fulfillment>;
};

/** Updates metadata for fulfillment. */
export type FulfillmentUpdateMeta = {
  __typename?: 'FulfillmentUpdateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  fulfillment?: Maybe<Fulfillment>;
};

/** Updates metadata for fulfillment. */
export type FulfillmentUpdatePrivateMeta = {
  __typename?: 'FulfillmentUpdatePrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  fulfillment?: Maybe<Fulfillment>;
};

/** Mark order as manually paid. */
export type OrderMarkAsPaid = {
  __typename?: 'OrderMarkAsPaid';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Order marked as paid. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

/** Refund an order. */
export type OrderRefund = {
  __typename?: 'OrderRefund';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A refunded order. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

/** Updates an order. */
export type OrderUpdate = {
  __typename?: 'OrderUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  orderErrors: Array<OrderError>;
  order?: Maybe<Order>;
};

export type OrderUpdateInput = {
  /** Billing address of the customer. */
  billingAddress?: Maybe<AddressInput>;
  /** Email address of the customer. */
  userEmail?: Maybe<Scalars['String']>;
  /** Shipping address of the customer. */
  shippingAddress?: Maybe<AddressInput>;
};

/** Updates meta for order. */
export type OrderUpdateMeta = {
  __typename?: 'OrderUpdateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  order?: Maybe<Order>;
};

/** Updates private meta for order. */
export type OrderUpdatePrivateMeta = {
  __typename?: 'OrderUpdatePrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  order?: Maybe<Order>;
};

/** Updates a shipping method of the order. */
export type OrderUpdateShipping = {
  __typename?: 'OrderUpdateShipping';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Order with updated shipping method. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

export type OrderUpdateShippingInput = {
  /** ID of the selected shipping method. */
  shippingMethod?: Maybe<Scalars['ID']>;
};

/** Void an order. */
export type OrderVoid = {
  __typename?: 'OrderVoid';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A voided order. */
  order?: Maybe<Order>;
  orderErrors: Array<OrderError>;
};

/** Cancels orders. */
export type OrderBulkCancel = {
  __typename?: 'OrderBulkCancel';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  orderErrors: Array<OrderError>;
};

/** Delete metadata of an object. */
export type DeleteMetadata = {
  __typename?: 'DeleteMetadata';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  metadataErrors: Array<MetadataError>;
  item?: Maybe<ObjectWithMetadata>;
};

export type MetadataError = {
  __typename?: 'MetadataError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: MetadataErrorCode;
};

/** An enumeration. */
export enum MetadataErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED'
}

/** Delete object's private metadata. */
export type DeletePrivateMetadata = {
  __typename?: 'DeletePrivateMetadata';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  metadataErrors: Array<MetadataError>;
  item?: Maybe<ObjectWithMetadata>;
};

/** Updates metadata of an object. */
export type UpdateMetadata = {
  __typename?: 'UpdateMetadata';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  metadataErrors: Array<MetadataError>;
  item?: Maybe<ObjectWithMetadata>;
};

export type MetadataInput = {
  /** Key of a metadata item. */
  key: Scalars['String'];
  /** Value of a metadata item. */
  value: Scalars['String'];
};

/** Updates private metadata of an object. */
export type UpdatePrivateMetadata = {
  __typename?: 'UpdatePrivateMetadata';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  metadataErrors: Array<MetadataError>;
  item?: Maybe<ObjectWithMetadata>;
};

/** Assigns storefront's navigation menus. */
export type AssignNavigation = {
  __typename?: 'AssignNavigation';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Assigned navigation menu. */
  menu?: Maybe<Menu>;
  menuErrors: Array<MenuError>;
};

export type MenuError = {
  __typename?: 'MenuError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: MenuErrorCode;
};

/** An enumeration. */
export enum MenuErrorCode {
  CannotAssignNode = 'CANNOT_ASSIGN_NODE',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  InvalidMenuItem = 'INVALID_MENU_ITEM',
  NoMenuItemProvided = 'NO_MENU_ITEM_PROVIDED',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  TooManyMenuItems = 'TOO_MANY_MENU_ITEMS',
  Unique = 'UNIQUE'
}

export enum NavigationType {
  /** Main storefront navigation. */
  Main = 'MAIN',
  /** Secondary storefront navigation. */
  Secondary = 'SECONDARY'
}

/** Creates a new Menu. */
export type MenuCreate = {
  __typename?: 'MenuCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  menuErrors: Array<MenuError>;
  menu?: Maybe<Menu>;
};

export type MenuCreateInput = {
  /** Name of the menu. */
  name: Scalars['String'];
  /** Slug of the menu. Will be generated if not provided. */
  slug?: Maybe<Scalars['String']>;
  /** List of menu items. */
  items?: Maybe<Array<Maybe<MenuItemInput>>>;
};

export type MenuItemInput = {
  /** Name of the menu item. */
  name?: Maybe<Scalars['String']>;
  /** URL of the pointed item. */
  url?: Maybe<Scalars['String']>;
  /** Category to which item points. */
  category?: Maybe<Scalars['ID']>;
  /** Collection to which item points. */
  collection?: Maybe<Scalars['ID']>;
  /** Page to which item points. */
  page?: Maybe<Scalars['ID']>;
};

/** Deletes a menu. */
export type MenuDelete = {
  __typename?: 'MenuDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  menuErrors: Array<MenuError>;
  menu?: Maybe<Menu>;
};

/** Deletes menus. */
export type MenuBulkDelete = {
  __typename?: 'MenuBulkDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  menuErrors: Array<MenuError>;
};

/** Updates a menu. */
export type MenuUpdate = {
  __typename?: 'MenuUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  menuErrors: Array<MenuError>;
  menu?: Maybe<Menu>;
};

export type MenuInput = {
  /** Name of the menu. */
  name?: Maybe<Scalars['String']>;
  /** Slug of the menu. */
  slug?: Maybe<Scalars['String']>;
};

/** Creates a new menu item. */
export type MenuItemCreate = {
  __typename?: 'MenuItemCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  menuErrors: Array<MenuError>;
  menuItem?: Maybe<MenuItem>;
};

export type MenuItemCreateInput = {
  /** Name of the menu item. */
  name: Scalars['String'];
  /** URL of the pointed item. */
  url?: Maybe<Scalars['String']>;
  /** Category to which item points. */
  category?: Maybe<Scalars['ID']>;
  /** Collection to which item points. */
  collection?: Maybe<Scalars['ID']>;
  /** Page to which item points. */
  page?: Maybe<Scalars['ID']>;
  /** Menu to which item belongs. */
  menu: Scalars['ID'];
  /** ID of the parent menu. If empty, menu will be top level menu. */
  parent?: Maybe<Scalars['ID']>;
};

/** Deletes a menu item. */
export type MenuItemDelete = {
  __typename?: 'MenuItemDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  menuErrors: Array<MenuError>;
  menuItem?: Maybe<MenuItem>;
};

/** Deletes menu items. */
export type MenuItemBulkDelete = {
  __typename?: 'MenuItemBulkDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  menuErrors: Array<MenuError>;
};

/** Updates a menu item. */
export type MenuItemUpdate = {
  __typename?: 'MenuItemUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  menuErrors: Array<MenuError>;
  menuItem?: Maybe<MenuItem>;
};

/** Creates/Updates translations for Menu Item. */
export type MenuItemTranslate = {
  __typename?: 'MenuItemTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  translationErrors: Array<TranslationError>;
  menuItem?: Maybe<MenuItem>;
};

/** Moves items of menus. */
export type MenuItemMove = {
  __typename?: 'MenuItemMove';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Assigned menu to move within. */
  menu?: Maybe<Menu>;
  menuErrors: Array<MenuError>;
};

export type MenuItemMoveInput = {
  /** The menu item ID to move. */
  itemId: Scalars['ID'];
  /** ID of the parent menu. If empty, menu will be top level menu. */
  parentId?: Maybe<Scalars['ID']>;
  /** The new relative sorting position of the item (from -inf to +inf). 1 moves the item one position forward, -1 moves the item one position backward, 0 leaves the item unchanged. */
  sortOrder?: Maybe<Scalars['Int']>;
};

/** Request an invoice for the order using plugin. */
export type InvoiceRequest = {
  __typename?: 'InvoiceRequest';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Order related to an invoice. */
  order?: Maybe<Order>;
  invoiceErrors: Array<InvoiceError>;
  invoice?: Maybe<Invoice>;
};

export type InvoiceError = {
  __typename?: 'InvoiceError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: InvoiceErrorCode;
};

/** An enumeration. */
export enum InvoiceErrorCode {
  Required = 'REQUIRED',
  NotReady = 'NOT_READY',
  UrlNotSet = 'URL_NOT_SET',
  EmailNotSet = 'EMAIL_NOT_SET',
  NumberNotSet = 'NUMBER_NOT_SET',
  NotFound = 'NOT_FOUND',
  InvalidStatus = 'INVALID_STATUS'
}

/** Requests deletion of an invoice. */
export type InvoiceRequestDelete = {
  __typename?: 'InvoiceRequestDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  invoiceErrors: Array<InvoiceError>;
  invoice?: Maybe<Invoice>;
};

/** Creates a ready to send invoice. */
export type InvoiceCreate = {
  __typename?: 'InvoiceCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  invoiceErrors: Array<InvoiceError>;
  invoice?: Maybe<Invoice>;
};

export type InvoiceCreateInput = {
  /** Invoice number. */
  number: Scalars['String'];
  /** URL of an invoice to download. */
  url: Scalars['String'];
};

/** Deletes an invoice. */
export type InvoiceDelete = {
  __typename?: 'InvoiceDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  invoiceErrors: Array<InvoiceError>;
  invoice?: Maybe<Invoice>;
};

/** Updates an invoice. */
export type InvoiceUpdate = {
  __typename?: 'InvoiceUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  invoiceErrors: Array<InvoiceError>;
  invoice?: Maybe<Invoice>;
};

export type UpdateInvoiceInput = {
  /** Invoice number */
  number?: Maybe<Scalars['String']>;
  /** URL of an invoice to download. */
  url?: Maybe<Scalars['String']>;
};

/** Send an invoice by email. */
export type InvoiceSendEmail = {
  __typename?: 'InvoiceSendEmail';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  invoiceErrors: Array<InvoiceError>;
  invoice?: Maybe<Invoice>;
};

/** Activate a gift card. */
export type GiftCardActivate = {
  __typename?: 'GiftCardActivate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A gift card to activate. */
  giftCard?: Maybe<GiftCard>;
  giftCardErrors: Array<GiftCardError>;
};

export type GiftCardError = {
  __typename?: 'GiftCardError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: GiftCardErrorCode;
};

/** An enumeration. */
export enum GiftCardErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

/** Creates a new gift card. */
export type GiftCardCreate = {
  __typename?: 'GiftCardCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  giftCardErrors: Array<GiftCardError>;
  giftCard?: Maybe<GiftCard>;
};

export type GiftCardCreateInput = {
  /** Start date of the gift card in ISO 8601 format. */
  startDate?: Maybe<Scalars['Date']>;
  /** End date of the gift card in ISO 8601 format. */
  endDate?: Maybe<Scalars['Date']>;
  /** Value of the gift card. */
  balance?: Maybe<Scalars['PositiveDecimal']>;
  /** The customer's email of the gift card buyer. */
  userEmail?: Maybe<Scalars['String']>;
  /** Code to use the gift card. */
  code?: Maybe<Scalars['String']>;
};

/** Deactivate a gift card. */
export type GiftCardDeactivate = {
  __typename?: 'GiftCardDeactivate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A gift card to deactivate. */
  giftCard?: Maybe<GiftCard>;
  giftCardErrors: Array<GiftCardError>;
};

/** Update a gift card. */
export type GiftCardUpdate = {
  __typename?: 'GiftCardUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  giftCardErrors: Array<GiftCardError>;
  giftCard?: Maybe<GiftCard>;
};

export type GiftCardUpdateInput = {
  /** Start date of the gift card in ISO 8601 format. */
  startDate?: Maybe<Scalars['Date']>;
  /** End date of the gift card in ISO 8601 format. */
  endDate?: Maybe<Scalars['Date']>;
  /** Value of the gift card. */
  balance?: Maybe<Scalars['PositiveDecimal']>;
  /** The customer's email of the gift card buyer. */
  userEmail?: Maybe<Scalars['String']>;
};

/** Update plugin configuration. */
export type PluginUpdate = {
  __typename?: 'PluginUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  plugin?: Maybe<Plugin>;
  pluginsErrors: Array<PluginError>;
};

export type PluginError = {
  __typename?: 'PluginError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: PluginErrorCode;
};

/** An enumeration. */
export enum PluginErrorCode {
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  PluginMisconfigured = 'PLUGIN_MISCONFIGURED',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type PluginUpdateInput = {
  /** Indicates whether the plugin should be enabled. */
  active?: Maybe<Scalars['Boolean']>;
  /** Configuration of the plugin. */
  configuration?: Maybe<Array<Maybe<ConfigurationItemInput>>>;
};

export type ConfigurationItemInput = {
  /** Name of the field to update. */
  name: Scalars['String'];
  /** Value of the given field to update. */
  value?: Maybe<Scalars['String']>;
};

/** Creates a new sale. */
export type SaleCreate = {
  __typename?: 'SaleCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  discountErrors: Array<DiscountError>;
  sale?: Maybe<Sale>;
};

export type DiscountError = {
  __typename?: 'DiscountError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: DiscountErrorCode;
};

/** An enumeration. */
export enum DiscountErrorCode {
  AlreadyExists = 'ALREADY_EXISTS',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type SaleInput = {
  /** Voucher name. */
  name?: Maybe<Scalars['String']>;
  /** Fixed or percentage. */
  type?: Maybe<DiscountValueTypeEnum>;
  /** Value of the voucher. */
  value?: Maybe<Scalars['PositiveDecimal']>;
  /** Products related to the discount. */
  products?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Categories related to the discount. */
  categories?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Collections related to the discount. */
  collections?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Start date of the voucher in ISO 8601 format. */
  startDate?: Maybe<Scalars['DateTime']>;
  /** End date of the voucher in ISO 8601 format. */
  endDate?: Maybe<Scalars['DateTime']>;
};

/** Deletes a sale. */
export type SaleDelete = {
  __typename?: 'SaleDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  discountErrors: Array<DiscountError>;
  sale?: Maybe<Sale>;
};

/** Deletes sales. */
export type SaleBulkDelete = {
  __typename?: 'SaleBulkDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  discountErrors: Array<DiscountError>;
};

/** Updates a sale. */
export type SaleUpdate = {
  __typename?: 'SaleUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  discountErrors: Array<DiscountError>;
  sale?: Maybe<Sale>;
};

/** Adds products, categories, collections to a voucher. */
export type SaleAddCatalogues = {
  __typename?: 'SaleAddCatalogues';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Sale of which catalogue IDs will be modified. */
  sale?: Maybe<Sale>;
  discountErrors: Array<DiscountError>;
};

export type CatalogueInput = {
  /** Products related to the discount. */
  products?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Categories related to the discount. */
  categories?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Collections related to the discount. */
  collections?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

/** Removes products, categories, collections from a sale. */
export type SaleRemoveCatalogues = {
  __typename?: 'SaleRemoveCatalogues';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Sale of which catalogue IDs will be modified. */
  sale?: Maybe<Sale>;
  discountErrors: Array<DiscountError>;
};

/** Creates/updates translations for a sale. */
export type SaleTranslate = {
  __typename?: 'SaleTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  translationErrors: Array<TranslationError>;
  sale?: Maybe<Sale>;
};

/** Creates a new voucher. */
export type VoucherCreate = {
  __typename?: 'VoucherCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  discountErrors: Array<DiscountError>;
  voucher?: Maybe<Voucher>;
};

export type VoucherInput = {
  /** Voucher type: PRODUCT, CATEGORY SHIPPING or ENTIRE_ORDER. */
  type?: Maybe<VoucherTypeEnum>;
  /** Voucher name. */
  name?: Maybe<Scalars['String']>;
  /** Code to use the voucher. */
  code?: Maybe<Scalars['String']>;
  /** Start date of the voucher in ISO 8601 format. */
  startDate?: Maybe<Scalars['DateTime']>;
  /** End date of the voucher in ISO 8601 format. */
  endDate?: Maybe<Scalars['DateTime']>;
  /** Choices: fixed or percentage. */
  discountValueType?: Maybe<DiscountValueTypeEnum>;
  /** Value of the voucher. */
  discountValue?: Maybe<Scalars['PositiveDecimal']>;
  /** Products discounted by the voucher. */
  products?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Collections discounted by the voucher. */
  collections?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Categories discounted by the voucher. */
  categories?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Min purchase amount required to apply the voucher. */
  minAmountSpent?: Maybe<Scalars['PositiveDecimal']>;
  /** Minimal quantity of checkout items required to apply the voucher. */
  minCheckoutItemsQuantity?: Maybe<Scalars['Int']>;
  /** Country codes that can be used with the shipping voucher. */
  countries?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Voucher should be applied to the cheapest item or entire order. */
  applyOncePerOrder?: Maybe<Scalars['Boolean']>;
  /** Voucher should be applied once per customer. */
  applyOncePerCustomer?: Maybe<Scalars['Boolean']>;
  /** Limit number of times this voucher can be used in total. */
  usageLimit?: Maybe<Scalars['Int']>;
};

/** Deletes a voucher. */
export type VoucherDelete = {
  __typename?: 'VoucherDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  discountErrors: Array<DiscountError>;
  voucher?: Maybe<Voucher>;
};

/** Deletes vouchers. */
export type VoucherBulkDelete = {
  __typename?: 'VoucherBulkDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  discountErrors: Array<DiscountError>;
};

/** Updates a voucher. */
export type VoucherUpdate = {
  __typename?: 'VoucherUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  discountErrors: Array<DiscountError>;
  voucher?: Maybe<Voucher>;
};

/** Adds products, categories, collections to a voucher. */
export type VoucherAddCatalogues = {
  __typename?: 'VoucherAddCatalogues';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Voucher of which catalogue IDs will be modified. */
  voucher?: Maybe<Voucher>;
  discountErrors: Array<DiscountError>;
};

/** Removes products, categories, collections from a voucher. */
export type VoucherRemoveCatalogues = {
  __typename?: 'VoucherRemoveCatalogues';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Voucher of which catalogue IDs will be modified. */
  voucher?: Maybe<Voucher>;
  discountErrors: Array<DiscountError>;
};

/** Creates/Updates translations for Voucher. */
export type VoucherTranslate = {
  __typename?: 'VoucherTranslate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  translationErrors: Array<TranslationError>;
  voucher?: Maybe<Voucher>;
};

/** Export products to csv file. */
export type ExportProducts = {
  __typename?: 'ExportProducts';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** The newly created export file job which is responsible for export data. */
  exportFile?: Maybe<ExportFile>;
  exportErrors: Array<ExportError>;
};

export type ExportError = {
  __typename?: 'ExportError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: ExportErrorCode;
};

/** An enumeration. */
export enum ExportErrorCode {
  Invalid = 'INVALID',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED'
}

export type ExportProductsInput = {
  /** Determine which products should be exported. */
  scope: ExportScope;
  /** Filtering options for products. */
  filter?: Maybe<ProductFilterInput>;
  /** List of products IDS to export. */
  ids?: Maybe<Array<Scalars['ID']>>;
  /** Input with info about fields which should be exported. */
  exportInfo?: Maybe<ExportInfoInput>;
  /** Type of exported file. */
  fileType: FileTypesEnum;
};

export enum ExportScope {
  /** Export all products. */
  All = 'ALL',
  /** Export products with given ids. */
  Ids = 'IDS',
  /** Export the filtered products. */
  Filter = 'FILTER'
}

export type ExportInfoInput = {
  /** List of attribute ids witch should be exported. */
  attributes?: Maybe<Array<Scalars['ID']>>;
  /** List of warehouse ids witch should be exported. */
  warehouses?: Maybe<Array<Scalars['ID']>>;
  /** List of product fields witch should be exported. */
  fields?: Maybe<Array<ProductFieldEnum>>;
};

export enum ProductFieldEnum {
  Name = 'NAME',
  Description = 'DESCRIPTION',
  ProductType = 'PRODUCT_TYPE',
  Category = 'CATEGORY',
  Visible = 'VISIBLE',
  AvailableForPurchase = 'AVAILABLE_FOR_PURCHASE',
  Searchable = 'SEARCHABLE',
  ProductWeight = 'PRODUCT_WEIGHT',
  Collections = 'COLLECTIONS',
  ChargeTaxes = 'CHARGE_TAXES',
  ProductImages = 'PRODUCT_IMAGES',
  VariantSku = 'VARIANT_SKU',
  VariantPrice = 'VARIANT_PRICE',
  CostPrice = 'COST_PRICE',
  VariantWeight = 'VARIANT_WEIGHT',
  VariantImages = 'VARIANT_IMAGES'
}

/** An enumeration. */
export enum FileTypesEnum {
  Csv = 'CSV',
  Xlsx = 'XLSX'
}

/** Adds a gift card or a voucher to a checkout. */
export type CheckoutAddPromoCode = {
  __typename?: 'CheckoutAddPromoCode';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** The checkout with the added gift card or voucher. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
};

export type CheckoutError = {
  __typename?: 'CheckoutError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: CheckoutErrorCode;
  /** List of varint IDs which causes the error. */
  variants?: Maybe<Array<Scalars['ID']>>;
};

/** An enumeration. */
export enum CheckoutErrorCode {
  BillingAddressNotSet = 'BILLING_ADDRESS_NOT_SET',
  CheckoutNotFullyPaid = 'CHECKOUT_NOT_FULLY_PAID',
  GraphqlError = 'GRAPHQL_ERROR',
  ProductNotPublished = 'PRODUCT_NOT_PUBLISHED',
  ProductUnavailableForPurchase = 'PRODUCT_UNAVAILABLE_FOR_PURCHASE',
  InsufficientStock = 'INSUFFICIENT_STOCK',
  Invalid = 'INVALID',
  InvalidShippingMethod = 'INVALID_SHIPPING_METHOD',
  NotFound = 'NOT_FOUND',
  PaymentError = 'PAYMENT_ERROR',
  QuantityGreaterThanLimit = 'QUANTITY_GREATER_THAN_LIMIT',
  Required = 'REQUIRED',
  ShippingAddressNotSet = 'SHIPPING_ADDRESS_NOT_SET',
  ShippingMethodNotApplicable = 'SHIPPING_METHOD_NOT_APPLICABLE',
  ShippingMethodNotSet = 'SHIPPING_METHOD_NOT_SET',
  ShippingNotRequired = 'SHIPPING_NOT_REQUIRED',
  TaxError = 'TAX_ERROR',
  Unique = 'UNIQUE',
  VoucherNotApplicable = 'VOUCHER_NOT_APPLICABLE',
  ZeroQuantity = 'ZERO_QUANTITY'
}

/** Update billing address in the existing checkout. */
export type CheckoutBillingAddressUpdate = {
  __typename?: 'CheckoutBillingAddressUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
};

/** Completes the checkout. As a result a new order is created and a payment charge is made. This action requires a successful payment before it can be performed. In case additional confirmation step as 3D secure is required confirmationNeeded flag will be set to True and no order created until payment is confirmed with second call of this mutation. */
export type CheckoutComplete = {
  __typename?: 'CheckoutComplete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Placed order. */
  order?: Maybe<Order>;
  /** Set to true if payment needs to be confirmed before checkout is complete. */
  confirmationNeeded: Scalars['Boolean'];
  /** Confirmation data used to process additional authorization steps. */
  confirmationData?: Maybe<Scalars['JSONString']>;
  checkoutErrors: Array<CheckoutError>;
};

/** Create a new checkout. */
export type CheckoutCreate = {
  __typename?: 'CheckoutCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Whether the checkout was created or the current active one was returned. Refer to checkoutLinesAdd and checkoutLinesUpdate to merge a cart with an active checkout. */
  created?: Maybe<Scalars['Boolean']>;
  checkoutErrors: Array<CheckoutError>;
  checkout?: Maybe<Checkout>;
};

export type CheckoutCreateInput = {
  /** A list of checkout lines, each containing information about an item in the checkout. */
  lines: Array<Maybe<CheckoutLineInput>>;
  /** The customer's email address. */
  email?: Maybe<Scalars['String']>;
  /** The mailing address to where the checkout will be shipped. Note: the address will be ignored if the checkout doesn't contain shippable items. */
  shippingAddress?: Maybe<AddressInput>;
  /** Billing address of the customer. */
  billingAddress?: Maybe<AddressInput>;
};

export type CheckoutLineInput = {
  /** The number of items purchased. */
  quantity: Scalars['Int'];
  /** ID of the product variant. */
  variantId: Scalars['ID'];
};

/** Sets the customer as the owner of the checkout. */
export type CheckoutCustomerAttach = {
  __typename?: 'CheckoutCustomerAttach';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
};

/** Removes the user assigned as the owner of the checkout. */
export type CheckoutCustomerDetach = {
  __typename?: 'CheckoutCustomerDetach';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
};

/** Updates email address in the existing checkout object. */
export type CheckoutEmailUpdate = {
  __typename?: 'CheckoutEmailUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
};

/** Deletes a CheckoutLine. */
export type CheckoutLineDelete = {
  __typename?: 'CheckoutLineDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
};

/** Adds a checkout line to the existing checkout. */
export type CheckoutLinesAdd = {
  __typename?: 'CheckoutLinesAdd';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
};

/** Updates checkout line in the existing checkout. */
export type CheckoutLinesUpdate = {
  __typename?: 'CheckoutLinesUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
};

/** Remove a gift card or a voucher from a checkout. */
export type CheckoutRemovePromoCode = {
  __typename?: 'CheckoutRemovePromoCode';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** The checkout with the removed gift card or voucher. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
};

/** Create a new payment for given checkout. */
export type CheckoutPaymentCreate = {
  __typename?: 'CheckoutPaymentCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Related checkout object. */
  checkout?: Maybe<Checkout>;
  /** A newly created payment. */
  payment?: Maybe<Payment>;
  paymentErrors: Array<PaymentError>;
};

export type PaymentInput = {
  /** A gateway to use with that payment. */
  gateway: Scalars['String'];
  /** Client-side generated payment token, representing customer's billing data in a secure manner. */
  token?: Maybe<Scalars['String']>;
  /** Total amount of the transaction, including all taxes and discounts. If no amount is provided, the checkout total will be used. */
  amount?: Maybe<Scalars['PositiveDecimal']>;
  /** [Deprecated] Billing address. If empty, the billing address associated with the checkout instance will be used. Use `checkoutCreate` or `checkoutBillingAddressUpdate` mutations to set it. This field will be removed after 2020-07-31. */
  billingAddress?: Maybe<AddressInput>;
  /** URL of a storefront view where user should be redirected after requiring additional actions. Payment with additional actions will not be finished if this field is not provided. */
  returnUrl?: Maybe<Scalars['String']>;
};

/** Update shipping address in the existing checkout. */
export type CheckoutShippingAddressUpdate = {
  __typename?: 'CheckoutShippingAddressUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
};

/** Updates the shipping address of the checkout. */
export type CheckoutShippingMethodUpdate = {
  __typename?: 'CheckoutShippingMethodUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated checkout. */
  checkout?: Maybe<Checkout>;
  checkoutErrors: Array<CheckoutError>;
};

/** Updates metadata for checkout. */
export type CheckoutUpdateMeta = {
  __typename?: 'CheckoutUpdateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  checkoutErrors: Array<CheckoutError>;
  checkout?: Maybe<Checkout>;
};

/** Clear metadata for checkout. */
export type CheckoutClearMeta = {
  __typename?: 'CheckoutClearMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  checkoutErrors: Array<CheckoutError>;
  checkout?: Maybe<Checkout>;
};

/** Updates private metadata for checkout. */
export type CheckoutUpdatePrivateMeta = {
  __typename?: 'CheckoutUpdatePrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  checkoutErrors: Array<CheckoutError>;
  checkout?: Maybe<Checkout>;
};

/** Clear private metadata for checkout. */
export type CheckoutClearPrivateMeta = {
  __typename?: 'CheckoutClearPrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  checkoutErrors: Array<CheckoutError>;
  checkout?: Maybe<Checkout>;
};

/** Creates a new app. */
export type AppCreate = {
  __typename?: 'AppCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** The newly created authentication token. */
  authToken?: Maybe<Scalars['String']>;
  appErrors: Array<AppError>;
  app?: Maybe<App>;
};

export type AppError = {
  __typename?: 'AppError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: AppErrorCode;
  /** List of permissions which causes the error. */
  permissions?: Maybe<Array<PermissionEnum>>;
};

/** An enumeration. */
export enum AppErrorCode {
  Forbidden = 'FORBIDDEN',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  InvalidStatus = 'INVALID_STATUS',
  InvalidPermission = 'INVALID_PERMISSION',
  InvalidUrlFormat = 'INVALID_URL_FORMAT',
  InvalidManifestFormat = 'INVALID_MANIFEST_FORMAT',
  ManifestUrlCantConnect = 'MANIFEST_URL_CANT_CONNECT',
  NotFound = 'NOT_FOUND',
  Required = 'REQUIRED',
  Unique = 'UNIQUE',
  OutOfScopeApp = 'OUT_OF_SCOPE_APP',
  OutOfScopePermission = 'OUT_OF_SCOPE_PERMISSION'
}

export type AppInput = {
  /** Name of the app. */
  name?: Maybe<Scalars['String']>;
  /** DEPRECATED: Use the `appActivate` and `appDeactivate` mutations instead. This field will be removed after 2020-07-31. */
  isActive?: Maybe<Scalars['Boolean']>;
  /** List of permission code names to assign to this app. */
  permissions?: Maybe<Array<Maybe<PermissionEnum>>>;
};

/** Updates an existing app. */
export type AppUpdate = {
  __typename?: 'AppUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  appErrors: Array<AppError>;
  app?: Maybe<App>;
};

/** Deletes an app. */
export type AppDelete = {
  __typename?: 'AppDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  appErrors: Array<AppError>;
  app?: Maybe<App>;
};

/** Creates a new token. */
export type AppTokenCreate = {
  __typename?: 'AppTokenCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** The newly created authentication token. */
  authToken?: Maybe<Scalars['String']>;
  appErrors: Array<AppError>;
  appToken?: Maybe<AppToken>;
};

export type AppTokenInput = {
  /** Name of the token. */
  name?: Maybe<Scalars['String']>;
  /** ID of app. */
  app: Scalars['ID'];
};

/** Deletes an authentication token assigned to app. */
export type AppTokenDelete = {
  __typename?: 'AppTokenDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  appErrors: Array<AppError>;
  appToken?: Maybe<AppToken>;
};

/** Verify provided app token. */
export type AppTokenVerify = {
  __typename?: 'AppTokenVerify';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Determine if token is valid or not. */
  valid: Scalars['Boolean'];
  appErrors: Array<AppError>;
};

/** Install new app by using app manifest. */
export type AppInstall = {
  __typename?: 'AppInstall';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  appErrors: Array<AppError>;
  appInstallation?: Maybe<AppInstallation>;
};

export type AppInstallInput = {
  /** Name of the app to install. */
  appName?: Maybe<Scalars['String']>;
  /** Url to app's manifest in JSON format. */
  manifestUrl?: Maybe<Scalars['String']>;
  /** Determine if app will be set active or not. */
  activateAfterInstallation?: Maybe<Scalars['Boolean']>;
  /** List of permission code names to assign to this app. */
  permissions?: Maybe<Array<Maybe<PermissionEnum>>>;
};

/** Retry failed installation of new app. */
export type AppRetryInstall = {
  __typename?: 'AppRetryInstall';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  appErrors: Array<AppError>;
  appInstallation?: Maybe<AppInstallation>;
};

/** Delete failed installation. */
export type AppDeleteFailedInstallation = {
  __typename?: 'AppDeleteFailedInstallation';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  appErrors: Array<AppError>;
  appInstallation?: Maybe<AppInstallation>;
};

/** Fetch and validate manifest. */
export type AppFetchManifest = {
  __typename?: 'AppFetchManifest';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  manifest?: Maybe<Manifest>;
  appErrors: Array<AppError>;
};

/** The manifest definition. */
export type Manifest = {
  __typename?: 'Manifest';
  identifier: Scalars['String'];
  version: Scalars['String'];
  name: Scalars['String'];
  about?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Permission>>>;
  appUrl?: Maybe<Scalars['String']>;
  configurationUrl?: Maybe<Scalars['String']>;
  tokenTargetUrl?: Maybe<Scalars['String']>;
  dataPrivacy?: Maybe<Scalars['String']>;
  dataPrivacyUrl?: Maybe<Scalars['String']>;
  homepageUrl?: Maybe<Scalars['String']>;
  supportUrl?: Maybe<Scalars['String']>;
};

/** Activate the app. */
export type AppActivate = {
  __typename?: 'AppActivate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  appErrors: Array<AppError>;
  app?: Maybe<App>;
};

/** Deactivate the app. */
export type AppDeactivate = {
  __typename?: 'AppDeactivate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  appErrors: Array<AppError>;
  app?: Maybe<App>;
};

/** Create JWT token. */
export type CreateToken = {
  __typename?: 'CreateToken';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** JWT token, required to authenticate. */
  token?: Maybe<Scalars['String']>;
  /** JWT refresh token, required to re-generate access token. */
  refreshToken?: Maybe<Scalars['String']>;
  /** CSRF token required to re-generate access token. */
  csrfToken?: Maybe<Scalars['String']>;
  /** A user instance. */
  user?: Maybe<User>;
  accountErrors: Array<AccountError>;
};

export type AccountError = {
  __typename?: 'AccountError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: AccountErrorCode;
};

/** An enumeration. */
export enum AccountErrorCode {
  ActivateOwnAccount = 'ACTIVATE_OWN_ACCOUNT',
  ActivateSuperuserAccount = 'ACTIVATE_SUPERUSER_ACCOUNT',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  DeactivateOwnAccount = 'DEACTIVATE_OWN_ACCOUNT',
  DeactivateSuperuserAccount = 'DEACTIVATE_SUPERUSER_ACCOUNT',
  DeleteNonStaffUser = 'DELETE_NON_STAFF_USER',
  DeleteOwnAccount = 'DELETE_OWN_ACCOUNT',
  DeleteStaffAccount = 'DELETE_STAFF_ACCOUNT',
  DeleteSuperuserAccount = 'DELETE_SUPERUSER_ACCOUNT',
  GraphqlError = 'GRAPHQL_ERROR',
  Invalid = 'INVALID',
  InvalidPassword = 'INVALID_PASSWORD',
  LeftNotManageablePermission = 'LEFT_NOT_MANAGEABLE_PERMISSION',
  InvalidCredentials = 'INVALID_CREDENTIALS',
  NotFound = 'NOT_FOUND',
  OutOfScopeServiceAccount = 'OUT_OF_SCOPE_SERVICE_ACCOUNT',
  OutOfScopeUser = 'OUT_OF_SCOPE_USER',
  OutOfScopeGroup = 'OUT_OF_SCOPE_GROUP',
  OutOfScopePermission = 'OUT_OF_SCOPE_PERMISSION',
  PasswordEntirelyNumeric = 'PASSWORD_ENTIRELY_NUMERIC',
  PasswordTooCommon = 'PASSWORD_TOO_COMMON',
  PasswordTooShort = 'PASSWORD_TOO_SHORT',
  PasswordTooSimilar = 'PASSWORD_TOO_SIMILAR',
  Required = 'REQUIRED',
  Unique = 'UNIQUE',
  JwtSignatureExpired = 'JWT_SIGNATURE_EXPIRED',
  JwtInvalidToken = 'JWT_INVALID_TOKEN',
  JwtDecodeError = 'JWT_DECODE_ERROR',
  JwtMissingToken = 'JWT_MISSING_TOKEN',
  JwtInvalidCsrfToken = 'JWT_INVALID_CSRF_TOKEN'
}

/** Refresh JWT token. Mutation tries to take refreshToken from the input.If it fails it will try to take refreshToken from the http-only cookie -refreshToken. csrfToken is required when refreshToken is provided as a cookie. */
export type RefreshToken = {
  __typename?: 'RefreshToken';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** JWT token, required to authenticate. */
  token?: Maybe<Scalars['String']>;
  /** A user instance. */
  user?: Maybe<User>;
  accountErrors: Array<AccountError>;
};

/** Verify JWT token. */
export type VerifyToken = {
  __typename?: 'VerifyToken';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** User assigned to token. */
  user?: Maybe<User>;
  /** Determine if token is valid or not. */
  isValid: Scalars['Boolean'];
  /** JWT payload. */
  payload?: Maybe<Scalars['GenericScalar']>;
  accountErrors: Array<AccountError>;
};


/** Deactivate all JWT tokens of the currently authenticated user. */
export type DeactivateAllUserTokens = {
  __typename?: 'DeactivateAllUserTokens';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  accountErrors: Array<AccountError>;
};

/** Sends an email with the account password modification link. */
export type RequestPasswordReset = {
  __typename?: 'RequestPasswordReset';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  accountErrors: Array<AccountError>;
};

/** Confirm user account with token sent by email during registration. */
export type ConfirmAccount = {
  __typename?: 'ConfirmAccount';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An activated user account. */
  user?: Maybe<User>;
  accountErrors: Array<AccountError>;
};

/** Sets the user's password from the token sent by email using the RequestPasswordReset mutation. */
export type SetPassword = {
  __typename?: 'SetPassword';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** JWT token, required to authenticate. */
  token?: Maybe<Scalars['String']>;
  /** JWT refresh token, required to re-generate access token. */
  refreshToken?: Maybe<Scalars['String']>;
  /** CSRF token required to re-generate access token. */
  csrfToken?: Maybe<Scalars['String']>;
  /** A user instance. */
  user?: Maybe<User>;
  accountErrors: Array<AccountError>;
};

/** Change the password of the logged in user. */
export type PasswordChange = {
  __typename?: 'PasswordChange';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A user instance with a new password. */
  user?: Maybe<User>;
  accountErrors: Array<AccountError>;
};

/** Request email change of the logged in user. */
export type RequestEmailChange = {
  __typename?: 'RequestEmailChange';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A user instance. */
  user?: Maybe<User>;
  accountErrors: Array<AccountError>;
};

/** Confirm the email change of the logged-in user. */
export type ConfirmEmailChange = {
  __typename?: 'ConfirmEmailChange';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A user instance with a new email. */
  user?: Maybe<User>;
  accountErrors: Array<AccountError>;
};

/** Create a new address for the customer. */
export type AccountAddressCreate = {
  __typename?: 'AccountAddressCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A user instance for which the address was created. */
  user?: Maybe<User>;
  accountErrors: Array<AccountError>;
  address?: Maybe<Address>;
};

/** An enumeration. */
export enum AddressTypeEnum {
  Billing = 'BILLING',
  Shipping = 'SHIPPING'
}

/** Updates an address of the logged-in user. */
export type AccountAddressUpdate = {
  __typename?: 'AccountAddressUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A user object for which the address was edited. */
  user?: Maybe<User>;
  accountErrors: Array<AccountError>;
  address?: Maybe<Address>;
};

/** Delete an address of the logged-in user. */
export type AccountAddressDelete = {
  __typename?: 'AccountAddressDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A user instance for which the address was deleted. */
  user?: Maybe<User>;
  accountErrors: Array<AccountError>;
  address?: Maybe<Address>;
};

/** Sets a default address for the authenticated user. */
export type AccountSetDefaultAddress = {
  __typename?: 'AccountSetDefaultAddress';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated user instance. */
  user?: Maybe<User>;
  accountErrors: Array<AccountError>;
};

/** Register a new user. */
export type AccountRegister = {
  __typename?: 'AccountRegister';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Informs whether users need to confirm their email address. */
  requiresConfirmation?: Maybe<Scalars['Boolean']>;
  accountErrors: Array<AccountError>;
  user?: Maybe<User>;
};

export type AccountRegisterInput = {
  /** The email address of the user. */
  email: Scalars['String'];
  /** Password. */
  password: Scalars['String'];
  /** Base of frontend URL that will be needed to create confirmation URL. */
  redirectUrl?: Maybe<Scalars['String']>;
};

/** Updates the account of the logged-in user. */
export type AccountUpdate = {
  __typename?: 'AccountUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  accountErrors: Array<AccountError>;
  user?: Maybe<User>;
};

export type AccountInput = {
  /** Given name. */
  firstName?: Maybe<Scalars['String']>;
  /** Family name. */
  lastName?: Maybe<Scalars['String']>;
  /** Billing address of the customer. */
  defaultBillingAddress?: Maybe<AddressInput>;
  /** Shipping address of the customer. */
  defaultShippingAddress?: Maybe<AddressInput>;
};

/** Sends an email with the account removal link for the logged-in user. */
export type AccountRequestDeletion = {
  __typename?: 'AccountRequestDeletion';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  accountErrors: Array<AccountError>;
};

/** Remove user account. */
export type AccountDelete = {
  __typename?: 'AccountDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  accountErrors: Array<AccountError>;
  user?: Maybe<User>;
};

/** Updates metadata of the logged-in user. */
export type AccountUpdateMeta = {
  __typename?: 'AccountUpdateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  accountErrors: Array<AccountError>;
  user?: Maybe<User>;
};

/** Creates user address. */
export type AddressCreate = {
  __typename?: 'AddressCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A user instance for which the address was created. */
  user?: Maybe<User>;
  accountErrors: Array<AccountError>;
  address?: Maybe<Address>;
};

/** Updates an address. */
export type AddressUpdate = {
  __typename?: 'AddressUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A user object for which the address was edited. */
  user?: Maybe<User>;
  accountErrors: Array<AccountError>;
  address?: Maybe<Address>;
};

/** Deletes an address. */
export type AddressDelete = {
  __typename?: 'AddressDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** A user instance for which the address was deleted. */
  user?: Maybe<User>;
  accountErrors: Array<AccountError>;
  address?: Maybe<Address>;
};

/** Sets a default address for the given user. */
export type AddressSetDefault = {
  __typename?: 'AddressSetDefault';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated user instance. */
  user?: Maybe<User>;
  accountErrors: Array<AccountError>;
};

/** Creates a new customer. */
export type CustomerCreate = {
  __typename?: 'CustomerCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  accountErrors: Array<AccountError>;
  user?: Maybe<User>;
};

export type UserCreateInput = {
  /** Billing address of the customer. */
  defaultBillingAddress?: Maybe<AddressInput>;
  /** Shipping address of the customer. */
  defaultShippingAddress?: Maybe<AddressInput>;
  /** Given name. */
  firstName?: Maybe<Scalars['String']>;
  /** Family name. */
  lastName?: Maybe<Scalars['String']>;
  /** The unique email address of the user. */
  email?: Maybe<Scalars['String']>;
  /** User account is active. */
  isActive?: Maybe<Scalars['Boolean']>;
  /** A note about the user. */
  note?: Maybe<Scalars['String']>;
  /** URL of a view where users should be redirected to set the password. URL in RFC 1808 format. */
  redirectUrl?: Maybe<Scalars['String']>;
};

/** Updates an existing customer. */
export type CustomerUpdate = {
  __typename?: 'CustomerUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  accountErrors: Array<AccountError>;
  user?: Maybe<User>;
};

export type CustomerInput = {
  /** Billing address of the customer. */
  defaultBillingAddress?: Maybe<AddressInput>;
  /** Shipping address of the customer. */
  defaultShippingAddress?: Maybe<AddressInput>;
  /** Given name. */
  firstName?: Maybe<Scalars['String']>;
  /** Family name. */
  lastName?: Maybe<Scalars['String']>;
  /** The unique email address of the user. */
  email?: Maybe<Scalars['String']>;
  /** User account is active. */
  isActive?: Maybe<Scalars['Boolean']>;
  /** A note about the user. */
  note?: Maybe<Scalars['String']>;
};

/** Deletes a customer. */
export type CustomerDelete = {
  __typename?: 'CustomerDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  accountErrors: Array<AccountError>;
  user?: Maybe<User>;
};

/** Deletes customers. */
export type CustomerBulkDelete = {
  __typename?: 'CustomerBulkDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  accountErrors: Array<AccountError>;
};

/** Creates a new staff user. */
export type StaffCreate = {
  __typename?: 'StaffCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  staffErrors: Array<StaffError>;
  user?: Maybe<User>;
};

export type StaffError = {
  __typename?: 'StaffError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: AccountErrorCode;
  /** List of permissions which causes the error. */
  permissions?: Maybe<Array<PermissionEnum>>;
  /** List of permission group IDs which cause the error. */
  groups?: Maybe<Array<Scalars['ID']>>;
  /** List of user IDs which causes the error. */
  users?: Maybe<Array<Scalars['ID']>>;
};

export type StaffCreateInput = {
  /** Given name. */
  firstName?: Maybe<Scalars['String']>;
  /** Family name. */
  lastName?: Maybe<Scalars['String']>;
  /** The unique email address of the user. */
  email?: Maybe<Scalars['String']>;
  /** User account is active. */
  isActive?: Maybe<Scalars['Boolean']>;
  /** A note about the user. */
  note?: Maybe<Scalars['String']>;
  /** List of permission group IDs to which user should be assigned. */
  addGroups?: Maybe<Array<Scalars['ID']>>;
  /** URL of a view where users should be redirected to set the password. URL in RFC 1808 format. */
  redirectUrl?: Maybe<Scalars['String']>;
};

/** Updates an existing staff user. */
export type StaffUpdate = {
  __typename?: 'StaffUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  staffErrors: Array<StaffError>;
  user?: Maybe<User>;
};

export type StaffUpdateInput = {
  /** Given name. */
  firstName?: Maybe<Scalars['String']>;
  /** Family name. */
  lastName?: Maybe<Scalars['String']>;
  /** The unique email address of the user. */
  email?: Maybe<Scalars['String']>;
  /** User account is active. */
  isActive?: Maybe<Scalars['Boolean']>;
  /** A note about the user. */
  note?: Maybe<Scalars['String']>;
  /** List of permission group IDs to which user should be assigned. */
  addGroups?: Maybe<Array<Scalars['ID']>>;
  /** List of permission group IDs from which user should be unassigned. */
  removeGroups?: Maybe<Array<Scalars['ID']>>;
};

/** Deletes a staff user. */
export type StaffDelete = {
  __typename?: 'StaffDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  staffErrors: Array<StaffError>;
  user?: Maybe<User>;
};

/** Deletes staff users. */
export type StaffBulkDelete = {
  __typename?: 'StaffBulkDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  staffErrors: Array<StaffError>;
};

/** Create a user avatar. Only for staff members. This mutation must be sent as a `multipart` request. More detailed specs of the upload format can be found here: https://github.com/jaydenseric/graphql-multipart-request-spec */
export type UserAvatarUpdate = {
  __typename?: 'UserAvatarUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated user instance. */
  user?: Maybe<User>;
  accountErrors: Array<AccountError>;
};

/** Deletes a user avatar. Only for staff members. */
export type UserAvatarDelete = {
  __typename?: 'UserAvatarDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** An updated user instance. */
  user?: Maybe<User>;
  accountErrors: Array<AccountError>;
};

/** Activate or deactivate users. */
export type UserBulkSetActive = {
  __typename?: 'UserBulkSetActive';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** Returns how many objects were affected. */
  count: Scalars['Int'];
  accountErrors: Array<AccountError>;
};

/** Updates metadata for user. */
export type UserUpdateMeta = {
  __typename?: 'UserUpdateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  accountErrors: Array<AccountError>;
  user?: Maybe<User>;
};

/** Clear metadata for user. */
export type UserClearMeta = {
  __typename?: 'UserClearMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  accountErrors: Array<AccountError>;
  user?: Maybe<User>;
};

/** Updates private metadata for user. */
export type UserUpdatePrivateMeta = {
  __typename?: 'UserUpdatePrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  accountErrors: Array<AccountError>;
  user?: Maybe<User>;
};

/** Clear private metadata for user. */
export type UserClearPrivateMeta = {
  __typename?: 'UserClearPrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  accountErrors: Array<AccountError>;
  user?: Maybe<User>;
};

/** Creates a new service account. */
export type ServiceAccountCreate = {
  __typename?: 'ServiceAccountCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** The newly created authentication token. */
  authToken?: Maybe<Scalars['String']>;
  accountErrors: Array<AccountError>;
  serviceAccount?: Maybe<ServiceAccount>;
};

export type ServiceAccountInput = {
  /** Name of the service account. */
  name?: Maybe<Scalars['String']>;
  /** Determine if this service account should be enabled. */
  isActive?: Maybe<Scalars['Boolean']>;
  /** List of permission code names to assign to this service account. */
  permissions?: Maybe<Array<Maybe<PermissionEnum>>>;
};

/** Updates an existing service account. */
export type ServiceAccountUpdate = {
  __typename?: 'ServiceAccountUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  accountErrors: Array<AccountError>;
  serviceAccount?: Maybe<ServiceAccount>;
};

/** Deletes a service account. */
export type ServiceAccountDelete = {
  __typename?: 'ServiceAccountDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  accountErrors: Array<AccountError>;
  serviceAccount?: Maybe<ServiceAccount>;
};

/** Updates private metadata for a service account. */
export type ServiceAccountUpdatePrivateMeta = {
  __typename?: 'ServiceAccountUpdatePrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  accountErrors: Array<AccountError>;
  serviceAccount?: Maybe<ServiceAccount>;
};

/** Clear private metadata for a service account. */
export type ServiceAccountClearPrivateMeta = {
  __typename?: 'ServiceAccountClearPrivateMeta';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  accountErrors: Array<AccountError>;
  serviceAccount?: Maybe<ServiceAccount>;
};

/** Creates a new token. */
export type ServiceAccountTokenCreate = {
  __typename?: 'ServiceAccountTokenCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  /** The newly created authentication token. */
  authToken?: Maybe<Scalars['String']>;
  accountErrors: Array<AccountError>;
  serviceAccountToken?: Maybe<ServiceAccountToken>;
};

export type ServiceAccountTokenInput = {
  /** Name of the token. */
  name?: Maybe<Scalars['String']>;
  /** ID of service account. */
  serviceAccount: Scalars['ID'];
};

/** Deletes an authentication token assigned to service account. */
export type ServiceAccountTokenDelete = {
  __typename?: 'ServiceAccountTokenDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  accountErrors: Array<AccountError>;
  serviceAccountToken?: Maybe<ServiceAccountToken>;
};

/** Create new permission group. */
export type PermissionGroupCreate = {
  __typename?: 'PermissionGroupCreate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  permissionGroupErrors: Array<PermissionGroupError>;
  group?: Maybe<Group>;
};

export type PermissionGroupError = {
  __typename?: 'PermissionGroupError';
  /** Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field. */
  field?: Maybe<Scalars['String']>;
  /** The error message. */
  message?: Maybe<Scalars['String']>;
  /** The error code. */
  code: PermissionGroupErrorCode;
  /** List of permissions which causes the error. */
  permissions?: Maybe<Array<PermissionEnum>>;
  /** List of user IDs which causes the error. */
  users?: Maybe<Array<Scalars['ID']>>;
};

/** An enumeration. */
export enum PermissionGroupErrorCode {
  AssignNonStaffMember = 'ASSIGN_NON_STAFF_MEMBER',
  DuplicatedInputItem = 'DUPLICATED_INPUT_ITEM',
  CannotRemoveFromLastGroup = 'CANNOT_REMOVE_FROM_LAST_GROUP',
  LeftNotManageablePermission = 'LEFT_NOT_MANAGEABLE_PERMISSION',
  OutOfScopePermission = 'OUT_OF_SCOPE_PERMISSION',
  OutOfScopeUser = 'OUT_OF_SCOPE_USER',
  Required = 'REQUIRED',
  Unique = 'UNIQUE'
}

export type PermissionGroupCreateInput = {
  /** List of permission code names to assign to this group. */
  addPermissions?: Maybe<Array<PermissionEnum>>;
  /** List of users to assign to this group. */
  addUsers?: Maybe<Array<Scalars['ID']>>;
  /** Group name. */
  name: Scalars['String'];
};

/** Update permission group. */
export type PermissionGroupUpdate = {
  __typename?: 'PermissionGroupUpdate';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  permissionGroupErrors: Array<PermissionGroupError>;
  group?: Maybe<Group>;
};

export type PermissionGroupUpdateInput = {
  /** List of permission code names to assign to this group. */
  addPermissions?: Maybe<Array<PermissionEnum>>;
  /** List of users to assign to this group. */
  addUsers?: Maybe<Array<Scalars['ID']>>;
  /** Group name. */
  name?: Maybe<Scalars['String']>;
  /** List of permission code names to unassign from this group. */
  removePermissions?: Maybe<Array<PermissionEnum>>;
  /** List of users to unassign from this group. */
  removeUsers?: Maybe<Array<Scalars['ID']>>;
};

/** Delete permission group. */
export type PermissionGroupDelete = {
  __typename?: 'PermissionGroupDelete';
  /**
   * List of errors that occurred executing the mutation.
   * @deprecated Use typed errors with error codes. This field will be removed after 2020-07-31.
   */
  errors: Array<Error>;
  permissionGroupErrors: Array<PermissionGroupError>;
  group?: Maybe<Group>;
};

export type GetLatestProductsQueryVariables = Exact<{
  keyword?: Maybe<Scalars['String']>;
}>;


export type GetLatestProductsQuery = (
  { __typename?: 'Query' }
  & { products?: Maybe<(
    { __typename?: 'ProductCountableConnection' }
    & { edges: Array<(
      { __typename?: 'ProductCountableEdge' }
      & { node: (
        { __typename?: 'Product' }
        & Pick<Product, 'id' | 'name' | 'description'>
        & { category?: Maybe<(
          { __typename?: 'Category' }
          & Pick<Category, 'name'>
        )> }
      ) }
    )> }
  )> }
);


export const GetLatestProductsDocument = gql`
    query getLatestProducts($keyword: String) {
  products(first: 5, filter: {search: $keyword}) {
    edges {
      node {
        id
        name
        description
        category {
          name
        }
      }
    }
  }
}
    `;

/**
 * __useGetLatestProductsQuery__
 *
 * To run a query within a React component, call `useGetLatestProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestProductsQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useGetLatestProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetLatestProductsQuery, GetLatestProductsQueryVariables>) {
        return Apollo.useQuery<GetLatestProductsQuery, GetLatestProductsQueryVariables>(GetLatestProductsDocument, baseOptions);
      }
export function useGetLatestProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLatestProductsQuery, GetLatestProductsQueryVariables>) {
          return Apollo.useLazyQuery<GetLatestProductsQuery, GetLatestProductsQueryVariables>(GetLatestProductsDocument, baseOptions);
        }
export type GetLatestProductsQueryHookResult = ReturnType<typeof useGetLatestProductsQuery>;
export type GetLatestProductsLazyQueryHookResult = ReturnType<typeof useGetLatestProductsLazyQuery>;
export type GetLatestProductsQueryResult = Apollo.QueryResult<GetLatestProductsQuery, GetLatestProductsQueryVariables>;
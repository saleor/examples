export interface SequraOrderRequest {
  /**
   * @description String containing state of the order. Allowed values are null (indicating no change) and 'confirmed'.
   */
  state: string | null;

  /**
   * @description Fields describing the merchant and the store integration
   */
  merchant: {
    id: string | number;

    /**
     * @description SeQura will make an IPN POST to this URL when the order is approved. The shop should use this signal to confirm the order. Example: \"https://my.shop.tld/checkout/sequra-ipn/8765432\".
     */
    notify_url?: string;

    /**
     * @description Optional name/value pairs that will be included in the IPN POST. Example: {\"cart\":\"1234\", \"signature\":\"K6hDNSwfcJjF+suAJqXAjA==\"}.
     */
    notification_parameters?: Record<string, string>;

    /**
     * @description The shopper will be redirected to this URL once the shop has confirmed the order after IPN notification. This field is recommended when using IPN. Example: \"https://my.shop.tld/checkout/confirmed\".
     */
    return_url?: string;

    /**
     * @description Name of Javascript function to call when SeQura approves the order and checkout should move to next step.  Can be used with or without IPN. *Cannot* be used with part-payment. Example: \"shop_callback_sequra_approved\".
     */
    approved_callback?: string;

    /**
     * @description URL for a page where the shopper can edit their name, address, etc. If provided, a link to this URL will be displayed just before SeQura's identification form.
     */
    edit_url?: string;

    /**
     * @description URL for a page where the shopper can pick another payment method. Used when part-payment fails to get credit card details. Example: \"https://my.shop.tld/checkout/payment\".
     */
    abort_url?: string;

    /**
     * @description Name of Javascript function to call if the shopper is rejected. The function is expected to display the other payment methods. Example: \"showHiddenMethods\".
     */
    rejected_callback?: string;

    /**
     * @description Name of Javascript function to call to get the shopper's part-payment details. Example: \"partpaymentWidgetDetails\".
     */
    partpayment_details_getter?: string;

    /**
     * @description When SeQura approves the order, the shopper's browser will make a POST to this URL without arguments. *Not used* when the integration is using IPN. *Not used* when approved_callback is present. Example: \"https://my.shop.tld/checkout/approved\".
     */
    approved_url?: string;

    /**
     * @description Permanent identifier for the store where the checkout takes place. Example: \"maquinista\". (string)** Mandatory for multistore merchants, optional for physical stores, not permitted for others
     */
    store_ref?: string;

    operator_ref?: string;

    tag_ref?: string;

    /**
     * @description Chain indentifier for merchant Example: \"Reparvehicle\".
     */
    garage_chain?: string;

    /**
     * @description Features activated by this merchant in this request
     */
    options?: {
      has_jquery?: boolean;

      /**
       * @description True if the merchant wishes to use the API option that explicitly communicates if some items will be shipped immediately after confirmation (see page Shipping items on checkout in the sidebar).Defaults to false. Example: false.
       */
      uses_shipped_cart?: boolean;

      /**
       * @description True if the merchant cannot send both addresses (delivery_address and invoice_address) during checkout. SeQura strongly suggests that this option is only used when the payload does not include any of the addresses. Defaults to false. Example: false.
       */
      addresses_may_be_missing?: boolean;

      /**
       * @description True if the merchant wishes to lock the provided shopper's personal data. Shoppers will not be able to edit this information if provided by the merchant. Defaults to false. Example: false.
       */
      immutable_customer_data?: boolean;
    };

    /**
     * @description Fields describing how the merchant wants to receive webhook events
     */
    events_webhook?: {
      url: string;

      /**
       * @description Optional name/value pairs that will be included in the webhook event POST. Example: {\"internal_identifier\":\"1234\", \"signature\":\"K6hDNSwfcJjF+suAJqXAjA==\"}.
       */
      parameters?: Record<string, string>;
    };

    /**
     * @description Timeout configuration. If this section is present, the identification form will display a count-down (MM:SS) to this time. When it reaches 0:00, the form will be disabled
     */
    timeout?: {
      timeout_at: string;

      /**
       * @description If the identification form is still visible at the timeout time the shopper will be redirected to this URL after a short delay during which the form displays an error message. Example: \"https://my.shop.tld/checkout/sequra-timeout/8765432\".
       */
      timeout_url: string;
    };
  };

  /**
   * @description Order id(s) used by the merchan
   */
  merchant_reference?: {
    order_ref_1: string | number;

    /**
     * @description Merchant reference 2. Example: \"0080-1234-4343-5353\".
     */
    order_ref_2?: string | number;
  };

  /**
   * @description Fields describing the shopping cart
   */
  cart: {
    currency: string;

    /**
     * @description Set to true if shopper has indicated that this is a gift. Example: false.
     */
    gift: boolean;

    /**
     * @description Total value with tax of the items listed below. Example: 5097.
     */
    order_total_with_tax: number;

    /**
     * @description Shop's unique id for this basket. Useful if shopper has trouble checking out. Example: \"123\".
     */
    cart_ref?: string | number;

    /**
     * @description Minimum duration of the subscription (in months), from the date of activation of subscription. Example: 24.
     */
    subscription_period?: number;

    /**
     * @description Total monthly cost of the subscription of the items listed below. Example: 1000.
     */
    subscription_total_price?: number;

    /**
     * @description When shopper put the first item in the cart. Example: \"2013-10-18T12:25:20+01:00\".
     */
    created_at?: string;

    /**
     * @description When shopper put the last item in the cart. Example: \"2013-10-18T12:25:20+01:00\".
     */
    updated_at?: string;

    /**
     * @description List of items in the order. The list can contain zero or more instances of each item type.
     */
    items: Array<
      | {
          type?: "product";

          /**
           * @description A public product id for this item. Example: \"12-123-1234\".
           */
          reference: string | number;

          /**
           * @description A description to include in the payment instructions. Example: \"Leather Case (iPod nano) - Negro / Chocolate\".
           */
          name: string;

          /**
           * @description Price with tax for one item. Example: 3030.
           */
          price_with_tax: number;

          /**
           * @description The number of items ordered by the shopper. Example: 2.
           */
          quantity: number;

          /**
           * @description Subscription period of item in months. Example: 24.
           */
          subscription_period?: number;

          /**
           * @description Subscription cost per month per item. Example: 500.
           */
          subscription_price_per_item?: number;

          /**
           * @description Total subscription cost per month (subscription_price_per_item * quantity) Example: 1000.
           */
          subscription_price?: number;

          /**
           * @description Price with tax for the amount in the order. Due to rounding, this might not be exactly quantity × price_with_tax. Example: 6060.
           */
          total_with_tax: number;

          /**
           * @description Can the buyer access or consume the product without a physical delivery? PDFs, e-tickets, software, etc are downloadable. Example: false.
           */
          downloadable: boolean;

          /**
           * @description A product is perishable if it loses its value if it is not delivered on time. Examples are fresh fruit and physical tickets. Example: false.
           */
          perishable?: boolean;

          /**
           * @description A product is personalized if it is irreversibly customized in a way that makes it less appealing to most people other than the buyer. Example: false.
           */
          personalized?: boolean;

          /**
           * @description A product is restockable if it can be sold to someone else if returned in good condition.  Foodstuff is generally not restockable. Example: true.
           */
          restockable?: boolean;

          /**
           * @description Name of category. Will not be shown to shopper. Useful against fraud. Example: \"ipod-accesorios\".
           */
          category?: string;

          /**
           * @description Product description. Will not be shown to shopper. Useful against fraud. Example: \"Este estuche de cuero de última moda ...\".
           */
          description?: string;

          /**
           * @description Name of manufacturer. Will not be shown to shopper. Useful against fraud. Example: \"Apple\".
           */
          manufacturer?: string;

          /**
           * @description Name of supplier or provider. Will not be shown to shopper. Useful against fraud. Example: \"Mayorista Makro\".
           */
          supplier?: string;

          /**
           * @description Id from database. Will not be shown to shopper. Sometimes useful if 'reference' varies too much over time. Example: \"6\".
           */
          product_id?: string | number;

          /**
           * @description Product page URL in your shop. Might be shown to shopper. Useful for customer service. Example: \"http://shop.example.com/ipod-accesorios/leather-case\".
           */
          url?: string;

          /**
           * @description A reference to the tracking in which this item will be handed. Example: \"first\".
           */
          tracking_reference?: string;
        }
      | {
          type: "handling";

          /**
           * @description A unique code that refers to this item. Does not have to exist in the shop catalogue. Example: \"seur24\".
           */
          reference: string | number;

          /**
           * @description A name to describe this item. More specific is better, i.e. prefer 'Correos' to 'Envío'. Example: \"SEUR entrega en 24 horas\".
           */
          name: string;

          /**
           * @description Price with tax for this handling service. Example: 242.
           */
          total_with_tax: number;
        }
      | {
          type: "invoice_fee";

          /**
           * @description Price with tax for the invoice (i1) service. Do not use with product codes other than i1. Example: 295.
           */
          total_with_tax: number;
        }
      | {
          type: "discount";

          /**
           * @description A unique code that refers to this discount. Can be the discount code. Example: \"HALFOFF\".
           */
          reference: string | number;

          /**
           * @description A name to describe this discount. Might be displayed in the payment instructions. Example: \"50 % off the full basket!\".
           */
          name: string;

          /**
           * @description Amount that this discount changes the cart value with tax. Should be negative. Example: -750.
           */
          total_with_tax: number;
        }
      | {
          type: "other_payment";

          /**
           * @description A code that refers to this \"other\" payment. (An \"other\" payment means that the shopper \" \\\n          \"has paid part of the cart using some other means of payment, like cash or credit card.) Example: \"CASH\". (string or int
           */
          reference: string | number;

          name: string;

          /**
           * @description Amount that this payment changes the cart value with tax. Should use opposite sign of any item it pays for. Example: -750.
           */
          total_with_tax: number;
        }
      | {
          type: "service";

          /**
           * @description A public id for this service. Example: \"NETWORKS-ADMIN-101\".
           */
          reference: string | number;

          /**
           * @description A name to describe this service. Might be displayed in the payment instructions. Example: \"Networks Administrator Course\".
           */
          name: string;

          /**
           * @description Maximum date for the service to be rendered or ended. Example: \"2017-06-30\".
           */
          ends_on: string;

          /**
           * @description Maximum time, from the start of the service, for the service to be rendered or ended. Example: \"P3M15D\".
           */
          ends_in: string;

          /**
           * @description Price with tax for one item. Example: 3030.
           */
          price_with_tax: number;

          /**
           * @description The number of items ordered by the shopper. Example: 1.
           */
          quantity: number;

          /**
           * @description Price with tax for the amount in the order. Due to rounding, this might not be exactly quantity × price_with_tax. Example: 75020.
           */
          total_with_tax: number;

          /**
           * @description True for services that can be fully (or sufficiently) enjoyed without a physical delivery. For instance, a course with only digital material. Example: false.
           */
          downloadable: boolean;

          /**
           * @description Name of supplier or provider. Example: \"Acme Formación\".
           */
          supplier?: string;

          /**
           * @description True when the service has been rendered Example: false.
           */
          rendered?: boolean;
        }
      | {
          type: "subscriber_fee";

          /**
           * @description A public product id for this item. Example: \"12-123-1234\".
           */
          reference?: string | number;

          /**
           * @description A description to include in the payment instructions. Example: \"Subscription fee\".
           */
          name: string;

          /**
           * @description Price with tax for one item. Example: 3030.
           */
          price_with_tax?: number;

          /**
           * @description The number of items ordered by the shopper. Example: 2.
           */
          quantity?: number;

          /**
           * @description Subscription period of item in months. Example: 24.
           */
          subscription_period?: number;

          /**
           * @description Subscription cost per month per item. Example: 500.
           */
          subscription_price_per_item?: number;

          /**
           * @description Total subscription cost per month (subscription_price_per_item * quantity) Example: 1000.
           */
          subscription_price?: number;

          /**
           * @description Price with tax for the amount in the order. Due to rounding, this might not be exactly quantity × price_with_tax. Example: 6060.
           */
          total_with_tax: number;
        }
    >;
  };

  /**
   * @description A list of trackings for the order
   */
  trackings?: Array<
    | {
        type: "pickup_store";

        /**
         * @description Internal tracking reference. Example: \"first\".
         */
        reference: string;

        /**
         * @description Permanent identifier for the operator that handed the delivery. Example: \"123-009\".
         */
        operator_ref?: string;

        /**
         * @description Permanent identifier for the store that handled this delivery. Example: \"maquinista\".
         */
        store_ref?: string;

        /**
         * @description Tracking number. Example: \"AB331\".
         */
        tracking_number?: string;

        /**
         * @description When this delivery was available in the store. Example: \"2014-02-05T13:21:22+01:00\".
         */
        available_at?: string;

        /**
         * @description When this delivery was handed. When set, the delivey is considered to be handed. Example: \"2014-02-05T19:21:22+01:00\".
         */
        delivered_at?: string;

        /**
         * @description Address line 1 for the store. Example: \"1600 Pennsylvania Avenue\".
         */
        address_line_1?: string;

        /**
         * @description Address line 2 for the store. Example: \"5º\".
         */
        address_line_2?: string;

        /**
         * @description Postal code. Example: \"08013\".
         */
        postal_code?: string;

        /**
         * @description City. Example: \"Barcelona\".
         */
        city?: string;

        /**
         * @description State or region. Example: \"Barcelona\".
         */
        state?: string;

        /**
         * @description Country code. Example: \"ES\".
         */
        country_code?: string;
      }
    | {
        type: "pickup_point";

        /**
         * @description Tracking reference. Example: \"second\".
         */
        reference: string;

        /**
         * @description Permanent identifier for the operator that handed the delivery. Example: \"123-009\".
         */
        operator_ref?: string;

        /**
         * @description Permanent identifier for the store that handled this delivery. Example: \"maquinista\".
         */
        store_ref?: string;

        /**
         * @description Tracking number. Example: \"AB331\".
         */
        tracking_number?: string;

        /**
         * @description When this delivery was available in the store. Example: \"2014-02-05T13:21:22+01:00\".
         */
        available_at?: string;

        /**
         * @description When this delivery was handed. When set, the delivey is considered to be handed. Example: \"2014-02-05T19:21:22+01:00\".
         */
        delivered_at?: string;

        /**
         * @description Address line 1 for the pickup point. Example: \"1600 Pennsylvania Avenue\".
         */
        address_line_1?: string;

        /**
         * @description Address line 2 for the pickup point. Example: \"5º\".
         */
        address_line_2?: string;

        /**
         * @description Postal code. Example: \"08013\".
         */
        postal_code?: string;

        /**
         * @description City. Example: \"Barcelona\".
         */
        city?: string;

        /**
         * @description State or region. Example: \"Barcelona\".
         */
        state?: string;

        /**
         * @description Country code. Example: \"ES\".
         */
        country_code?: string;
      }
    | {
        type: "postal";

        /**
         * @description Internal tracking reference. Example: \"third\".
         */
        reference: string;

        /**
         * @description The name of the company that handled this delivery. Example: \"SEUR\".
         */
        carrier: string;

        /**
         * @description Tracking number. Example: \"TX123\".
         */
        tracking_number?: string;

        /**
         * @description Tracking URL. Example: \"https://logistics.es/TX123\".
         */
        tracking_url?: string;

        /**
         * @description When this delivery was handed. When set, the delivey is considered to be handed. Example: \"2014-02-05T19:21:22+01:00\".
         */
        delivered_at?: string;
      }
  >;

  /**
   * @description Delivery method used on the purchase
   */
  delivery_method: {
    name: string;

    /**
     * @description Days it takes to deliver the goods. Example: \"¡Entrega día siguiente!\".
     */
    days?: string;

    /**
     * @description Company or agent that performs the delivery. Example: \"Correos\".
     */
    provider?: string;

    /**
     * @description If goods are delivered to the buyer's home or office and not to a pick-up place. Example: true.
     */
    home_delivery?: boolean;
  };

  /**
   * @description Fields describing the delivery address
   */
  delivery_address?: {
    given_names: string;

    /**
     * @description Shopper's last names for delivery. Example: \"Barroso Rajoy\".
     */
    surnames: string;

    /**
     * @description Shopper company name.
     */
    company: string;

    /**
     * @description Delivery address line 1. Example: \"C/ Aragó 383\".
     */
    address_line_1: string;

    /**
     * @description Delivery address line 2. Example: \"5º\".
     */
    address_line_2: string;

    /**
     * @description Delivery address address postal code. Example: \"08013\".
     */
    postal_code: string;

    /**
     * @description Delivery address city. Example: \"Barcelona\".
     */
    city: string;

    /**
     * @description Delivery address country code. Example: \"ES\".
     */
    country_code: string;

    /**
     * @description Shopper phone. Can be a mobile phone. Example: \"933 033 033\".
     */
    phone?: string;

    /**
     * @description Shopper mobile phone. Only use this field if the shopper indicated that this number is a mobile phone. Example: \"615 615 615\".
     */
    mobile_phone?: string;

    /**
     * @description Shopper region or state. Example: \"Barcelona\".
     */
    state?: string;

    /**
     * @description Extra handling information that the shopper adds to the order. Example: \"I'm home between 9 and 12.\".
     */
    extra?: string;

    /**
     * @description Shopper VAT number. Example: \"B12345\".
     */
    vat_number?: string;
  };

  /**
   * @description Fields describing the invoice address
   */
  invoice_address?: {
    given_names: string;

    /**
     * @description Shopper's last names for invoice. Example: \"Barroso Rajoy\".
     */
    surnames: string;

    /**
     * @description Shopper company name.
     */
    company: string;

    /**
     * @description Invoice address line 1.
     */
    address_line_1: string;

    /**
     * @description Invoice address line 2.
     */
    address_line_2: string;

    /**
     * @description Invoice address address postal code.
     */
    postal_code: string;

    /**
     * @description Invoice address city.
     */
    city: string;

    /**
     * @description Invoice address country code. Example: \"ES\".
     */
    country_code: string;

    /**
     * @description Shopper phone. Can be a mobile phone. Example: \"933 033 033\".
     */
    phone?: string;

    /**
     * @description Shopper mobile phone. Only use this field if the shopper indicated that this number is a mobile phone. Example: \"615 615 615\".
     */
    mobile_phone?: string;

    /**
     * @description Shopper region or state. Example: \"Tarragona\".
     */
    state?: string;

    /**
     * @description Extra handling information that the shopper adds to the order. Example: \"I'm home between 9 and 12.\".
     */
    extra?: string;

    /**
     * @description Shopper VAT number. Example: \"B12345\".
     */
    vat_number?: string;
  };

  /**
   * @description Fields describing the customer
   */
  customer: {
    given_names: string;

    /**
     * @description Customer surnames. Example: \"Barroso Rajoy\".
     */
    surnames: string;

    /**
     * @description Customer title and/or gender. Use the one of 'mr', 'ms', 'mrs', 'miss' or 'mx' that is closest to the information supplied by the customer. If none of these can be inferred, use the title that the customer entered as-is.  See also 'Note about title' in the docs. Example: \"mr\".
     */
    title?: string;

    /**
     * @description Customer email. Example: \"nisse@example.com\".
     */
    email: string;

    /**
     * @description Is the customer logged in? Use 'unknown' if your platform cannot check whether the user is logged in or not Example: true.
     */
    logged_in: boolean | "unknown";

    /**
     * @description Customer language code. Example: \"es-ES\".
     */
    language_code: string;

    /**
     * @description Customer ip number. Example: \"12.23.34.45\".
     */
    ip_number: string;

    /**
     * @description Customer browser. Example: \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36\".
     */
    user_agent: string | null;

    /**
     * @description Customer reference number in the shop's database. Example: 123.
     */
    ref?: string | number;

    /**
     * @description Customer date of birth in ISO-8601 format. Example: \"1980-01-20\".
     */
    date_of_birth?: string;

    /**
     * @description Customer's national identity number. For Spanish DNI, please include final letter. Example: \"13003009L\".
     */
    nin?: string;

    /**
     * @description Customer company name.
     */
    company?: string;

    /**
     * @description Shopper VAT number. Example: \"B12345\".
     */
    vat_number?: string;

    /**
     * @description Date when this customer was added to the shop database, in ISO-8601 format. Example: \"2013-08-15T21:07:37+01:00\".
     */
    created_at?: string;

    /**
     * @description Date when this customer was updated in the shop database, in ISO-8601 format. Example: \"2013-09-27T16:50:25+01:00\".
     */
    updated_at?: string;

    /**
     * @description The merchant's rating of this customer. 0 to 100, inclusive, where 0 is \"cannot be trusted\" and 100 is \"very trustworthy\". Example: 100.
     */
    rating?: number;

    /**
     * @description A validation code printed in the physical DNI or NIE. Required for multistore merchants and physical stores. See the FAQs to know more. Example: \"15012018F2\".
     */
    nin_control?: string;

    /**
     * @description List of customer's previous orders in this shop.
     */
    previous_orders?: Array<{
      /**
       * @description Date (and time, if available) when this order was created or delivered, in ISO-8601 format. Example: \"2013-06-11T12:27:40+02:00\".
       */
      created_at: string;

      /**
       * @description Total order amount including tax. Example: 4656.
       */
      amount: number;

      /**
       * @description Currency name for amount. Example: \"EUR\".
       */
      currency: string;

      /**
       * @description The status of the order as reported in the platform. Example: \"Shipped\".
       */
      raw_status?: string;

      /**
       * @description The mapped status value. Use one of 'processing', 'shipped' or 'cancelled' Example: \"shipped\".
       */
      status?: string;

      /**
       * @description Payment method as reported by the platform. Example: \"PayPal\".
       */
      payment_method_raw?: string;

      /**
       * @description Mapped payment methods. Use one of CC (for credit cards), PP (for PayPal), TR (for bank wire), COD (for cash on delivery, contrareembolso), SQ (SeQura). For other methods, use O/ plus a name, e.g. 'O/postal_giro' Example: \"PP\".
       */
      payment_method?: string;

      /**
       * @description Previous order's delivery address postal code. Example: \"08013\".
       */
      postal_code?: string;

      /**
       * @description Previous order's country code. Example: \"ES\".
       */
      country_code?: string;
    }>;

    /**
     * @description Fields describing the customer's vehicl
     */
    vehicle?: {
      plaque: string;

      /**
       * @description Brand from customer's vehicle Example: \"Volkswagen\".
       */
      brand?: string;

      /**
       * @description Model from customer's vehicle Example: \"Beetle\".
       */
      model?: string;

      /**
       * @description Frame identificator from customer's vehicle Example: \"VF1RFD00653635032\".
       */
      frame?: string;

      /**
       * @description First registration date plaque from customer's vehicle Example: \"2000-03-25\".
       */
      first_registration_date?: string;
    };
  };

  /**
   * @description Fields describing the In-store integration
   */
  instore?: {
    code: string;
  };

  /**
   * @description Fields describing the medium for which the response will be generated
   */
  gui: {
    layout: string;
  };

  /**
   * @description Fields describing the store platform
   */
  platform: {
    name: string;

    /**
     * @description Version of the platform.  If you don't use explicit versioning, use a release date instead. Example: \"1.1\".
     */
    version: string;

    /**
     * @description Version of the plugin or platform module.  If you don't use explicit versioning, use a release date instead. Example: \"1.0.2\".
     */
    plugin_version?: string;

    /**
     * @description uname of the shop server. In PHP, use php_uname(). Example: \"Darwin roatan.local 13.0.0 Darwin Kernel Version 13.0... x86_64\".
     */
    uname: string;

    /**
     * @description DB used. Example: \"mysql\".
     */
    db_name: string;

    /**
     * @description Version of the DB. Example: \"1.2.3\".
     */
    db_version: string;

    /**
     * @description PHP interpreter version. Example: \"5.4.1.7\".
     */
    php_version?: string;
  };

  /**
   * @description When the first payment for the order should be charged. Example: \"2001-01-01\".
   */
  first_charge_date?: string;
}

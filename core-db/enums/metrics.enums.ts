export enum ActionType {
  PAGE_VIEW = 'page_view',
  CATEGORY_VIEW = 'category_view',
  SUBCATEGORY_VIEW = 'subcategory_view',
  STYLE_SELECTED = 'style_selected',
  CUSTOMIZATION_STARTED = 'customization_started',
  ORDER_INITIATED = 'order_initiated',
  ORDER_COMPLETED = 'order_completed',
  LOGIN = 'login',
  LOGOUT = 'logout',
  SIGNUP = 'signup',
  ADD_TO_CART = 'add_to_cart',
  REMOVE_FROM_CART = 'remove_from_cart',
  CHECKOUT_STARTED = 'checkout_started',
  OPTION_SELECTED = 'option_selected',
}

export enum TargetType {
  CATEGORY = 'category',
  SUBCATEGORY = 'subcategory',
  STYLE = 'style',
  OPTION = 'option',
  BUTTON = 'button',
  FORM = 'form',
  PRODUCT = 'product',
  SECTION = 'section',
  BANNER = 'banner',
}

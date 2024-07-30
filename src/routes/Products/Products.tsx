import { useEffect, useState, MouseEvent, useLayoutEffect } from "react";
import {
  useLoaderData,
  useSubmit,
  useActionData,
  useNavigate,
  useMatch,
  Outlet,
} from "react-router-dom";
import classnames from "classnames";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import { useSnackbar } from "react-simple-snackbar";
import SearchBar from "components/SearchBar";
import ProductCard from "components/ProductCard";
import SticyLink from "components/StickyLink";
import EmptyState from "components/EmptyState";
import { ProductListItem, ErrorType } from "helpers/customTypes";
import { ROUTES } from "helpers/constants";
import { es } from "helpers/strings";

export default function Products() {
  const data = useLoaderData() as ProductListItem[];
  const submit = useSubmit();
  const navigate = useNavigate();
  const productsTab = useMatch(ROUTES.DASHBOARD);
  const ordersTab = useMatch(`${ROUTES.DASHBOARD}${ROUTES.ORDERS}`);
  const actionData = useActionData() as ErrorType & { id: string };
  const [openSnackbar] = useSnackbar();
  const [products, setProducts] = useState<ProductListItem[]>(data);
  const [tabIndex, setTabIndex] = useState(0);

  const onSearch = (search: string) => {
    if (search) {
      const filtered = data.filter((product) =>
        product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
      setProducts(filtered);
    } else {
      setProducts(data);
    }
  };

  const handleRemove = (event: MouseEvent<HTMLElement>, productId: string) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("products", "deleteProduct");
    formData.append("productId", productId);
    submit(formData, { method: "post" });
  };

  const handleTabChange = (index: number) => {
    setTabIndex(index);
    switch (index) {
      case 0:
        navigate(ROUTES.DASHBOARD);
        break;
      case 1:
        navigate(`${ROUTES.DASHBOARD}${ROUTES.ORDERS}`);
        break;
    }
  };

  useEffect(() => {
    if (actionData?.message) {
      openSnackbar(actionData?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  useEffect(() => {
    if (actionData?.statusText === "200") {
      setProducts((prev) =>
        prev.filter((product) => `${product.id}` !== actionData.id || "")
      );
    }
  }, [actionData]);

  useLayoutEffect(() => {
    if (productsTab) {
      setTabIndex(0);
    } else if (ordersTab) {
      setTabIndex(1);
    }
  }, [ordersTab, productsTab]);

  return (
    <Tabs
      className="pt-6 mt-11 flex flex-col items-center w-full"
      index={tabIndex}
      onChange={handleTabChange}
      data-testid="product_tabs"
    >
      <TabList className="flex w-full border-b dark:border-slate-600 px-4">
        <Tab
          className="px-2 py-1 rounded-t dark:text-slate-200"
          data-testid="variant_tab-header"
        >
          {es.orders.products}
        </Tab>
        <Tab
          className="px-2 py-1 rounded-t dark:text-slate-200"
          data-testid="customization_tab-header"
        >
          {es.orders.name}
        </Tab>
      </TabList>

      <TabPanels className="w-full">
        <TabPanel as="section" data-testid="products_tab-panel">
          <div className="relative flex flex-col items-center">
            <SearchBar onSearch={onSearch} placeholder={es.products.search} />
            <SticyLink to={ROUTES.NEW_PRODUCT} title={es.products.new} />
            {products.length > 0 && (
              <div
                className={classnames(
                  "grid grid-cols-1 gap-4",
                  "sm:grid-cols-2 md:grid-cols-3",
                  "lg:grid-cols-5 w-full",
                  "pt-7 px-4"
                )}
                data-testid="product-list"
              >
                {products &&
                  (products || []).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onRemove={handleRemove}
                    />
                  ))}
              </div>
            )}
            {products.length === 0 && <EmptyState name={es.products.name} />}
          </div>
        </TabPanel>
        <TabPanel as="section" data-testid="orders_tab-panel">
          <Outlet />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

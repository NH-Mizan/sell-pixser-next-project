import { getAssetUrl } from "@/lib/api";
import { getSessionToken, laravelFetch } from "@/lib/auth";
import InvoiceActions from "@/components/Dashboard/InvoiceActions";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function formatDate(value) {
  if (!value) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(new Date(value));
}

function formatDateLong(value) {
  if (!value) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function getLineTotal(item) {
  return Number(item?.sale_price || 0) * Number(item?.qty || 0);
}

function buildVariantText(item) {
  const pieces = [];

  if (item?.product_size) {
    pieces.push(`Size: ${item.product_size}`);
  }

  if (item?.product_color) {
    pieces.push(`Color: ${item.product_color}`);
  }

  return pieces.join(" | ");
}

function SummaryRow({ label, value, strong }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 last:border-b-0">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <span className={`text-sm ${strong ? "font-bold text-slate-950" : "font-semibold text-slate-800"}`}>
        {value}
      </span>
    </div>
  );
}

export default async function OrderInvoicePage({ params }) {
  const token = await getSessionToken();

  if (!token) {
    notFound();
  }

  const { id } = await params;
  let invoiceData = null;

  try {
    const { response, data } = await laravelFetch(`/customer/invoice/${id}`, { token });

    if (!response.ok || !data?.order) {
      notFound();
    }

    invoiceData = data;
  } catch {
    notFound();
  }

  const { order, owner, companyinfo } = invoiceData;
  const items = Array.isArray(order?.orderdetails) ? order.orderdetails : [];
  const subtotal = items.reduce((sum, item) => sum + getLineTotal(item), 0);
  const logo = getAssetUrl(owner?.dark_logo || owner?.white_logo);

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#f8fbff_0%,#ffffff_48%,#fff8f1_100%)] p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pry">
            Invoice
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Order #{order?.invoice_id}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Created on {formatDateLong(order?.created_at)} and linked to order ID {order?.id}.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 print:hidden">
          <Link
            href="/dashboard/orders"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-950"
          >
            <FaArrowLeft />
            Back to orders
          </Link>
          <InvoiceActions />
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-8 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-6">
              <div className="relative h-16 w-44">
                <Image
                  src={logo}
                  alt={owner?.name || "Store logo"}
                  fill
                  className="object-contain object-left"
                />
              </div>
              <div className="flex h-16 items-end gap-1">
                {Array.from({ length: 22 }).map((_, index) => (
                  <span
                    key={index}
                    className="block w-1 rounded-full bg-slate-900"
                    style={{ height: `${22 + ((index * 7) % 34)}px` }}
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[1.5rem] bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Seller
                </p>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">{owner?.name || "Sell Pixer"}</p>
                  <p>{companyinfo?.email || companyinfo?.hotmail || "N/A"}</p>
                  <p>{companyinfo?.phone || companyinfo?.hotline || "N/A"}</p>
                  <p>{companyinfo?.address || "Address unavailable"}</p>
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Delivery Details
                </p>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">
                    {order?.shipping?.name || order?.customer?.name || "Customer"}
                  </p>
                  <p>{order?.shipping?.phone || order?.customer?.phone || "N/A"}</p>
                  <p>{order?.shipping?.address || order?.customer?.address || "N/A"}</p>
                  <p>{order?.customer?.district || "District unavailable"}</p>
                </div>
              </div>
            </div>

            {order?.note ? (
              <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                  Order Note
                </p>
                <p className="mt-2 text-sm leading-6 text-amber-900">{order.note}</p>
              </div>
            ) : null}
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  Invoice ID
                </p>
                <p className="mt-2 text-lg font-bold text-slate-950">#{order?.invoice_id}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  Order Date
                </p>
                <p className="mt-2 text-lg font-bold text-slate-950">
                  {formatDate(order?.created_at)}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  Payment Method
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {order?.payment?.payment_method || "N/A"}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  Payment Status
                </p>
                <p className="mt-2 text-sm font-semibold capitalize text-slate-900">
                  {order?.payment?.payment_status || "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-slate-200">
              <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />
              <SummaryRow
                label="Delivery Charge"
                value={formatCurrency(order?.shipping_charge)}
              />
              <SummaryRow label="Discount" value={formatCurrency(order?.discount)} />
              <SummaryRow
                label="Payable Total"
                value={formatCurrency(order?.amount)}
                strong
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 px-6 py-6 lg:px-8">
          <div className="overflow-hidden rounded-[1.5rem] border border-slate-200">
            <div className="hidden grid-cols-[minmax(0,1.2fr)_120px_140px] bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 md:grid">
              <p>Product</p>
              <p className="text-center">Quantity</p>
              <p className="text-right">Total</p>
            </div>

            <div className="divide-y divide-slate-200">
              {items.map((item) => {
                const variantText = buildVariantText(item);
                const productImage = getAssetUrl(item?.image?.image);

                return (
                  <div
                    key={item.id}
                    className="grid gap-4 px-5 py-4 md:grid-cols-[minmax(0,1.2fr)_120px_140px] md:items-center"
                  >
                    <div className="flex gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                        <Image
                          src={productImage}
                          alt={item?.product_name || "Product"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold leading-6 text-slate-900">
                          {item?.product_name}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {variantText || "Standard variant"}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Unit price: {formatCurrency(item?.sale_price)}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-slate-700 md:text-center">
                      {item?.qty} x {formatCurrency(item?.sale_price)}
                    </div>
                    <div className="text-sm font-bold text-slate-950 md:text-right">
                      {formatCurrency(getLineTotal(item))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 px-6 py-6 lg:px-8">
          <div className="overflow-hidden rounded-[1.5rem] border border-slate-200">
            <div className="grid grid-cols-2 bg-slate-50 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 md:grid-cols-5">
              <div className="border-r border-slate-200 px-4 py-3">Transaction Date</div>
              <div className="border-r border-slate-200 px-4 py-3">Payment Gateway</div>
              <div className="border-r border-slate-200 px-4 py-3">Transaction ID</div>
              <div className="hidden border-r border-slate-200 px-4 py-3 md:block">
                Account Number
              </div>
              <div className="px-4 py-3 text-right">Amount</div>
            </div>
            <div className="grid grid-cols-2 text-sm text-slate-700 md:grid-cols-5">
              <div className="border-r border-t border-slate-200 px-4 py-4">
                {formatDate(order?.payment?.created_at || order?.created_at)}
              </div>
              <div className="border-r border-t border-slate-200 px-4 py-4">
                {order?.payment?.payment_method || "N/A"}
              </div>
              <div className="border-r border-t border-slate-200 px-4 py-4">
                {order?.payment?.trx_id || "N/A"}
              </div>
              <div className="hidden border-r border-t border-slate-200 px-4 py-4 md:block">
                {order?.payment?.sender_number || "N/A"}
              </div>
              <div className="border-t border-slate-200 px-4 py-4 text-right font-semibold text-slate-950">
                {formatCurrency(order?.payment?.amount || order?.amount)}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 px-6 py-8 text-center lg:px-8">
          <h3 className="text-2xl font-bold italic text-slate-950">Terms & Conditions</h3>
          <p className="mt-3 text-sm italic text-slate-500">
            This is a computer generated invoice, so no signature is required.
          </p>
        </div>
      </section>
    </div>
  );
}

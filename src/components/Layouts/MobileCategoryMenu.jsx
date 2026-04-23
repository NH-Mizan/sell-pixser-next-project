'use client';

import { memo, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

function getSubcategories(category) {
  return (
    category?.subcategories ||
    category?.subCategories ||
    category?.sub_categories ||
    []
  );
}

function getChildCategories(subcategory) {
  return (
    subcategory?.childCategories ||
    subcategory?.child_categories ||
    subcategory?.children ||
    []
  );
}

function getItemId(item, fallback) {
  return item?.id ?? item?._id ?? item?.slug ?? fallback;
}

const ToggleIcon = memo(function ToggleIcon({ isOpen }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-sm font-semibold text-white transition-all duration-300"
    >
      {isOpen ? '-' : '+'}
    </span>
  );
});

const ChildCategoryButton = memo(function ChildCategoryButton({
  child,
  isActive,
  onClick,
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onClick(child)}
        className={`flex w-full items-center rounded-xl px-3 py-2 pl-8 text-left text-sm transition-all duration-300 ${
          isActive
            ? 'bg-white text-black shadow-sm'
            : 'text-white/80 hover:bg-white/10 hover:text-white'
        }`}
      >
        <span className="mr-2 text-white/40">-</span>
        <span className="mr-2 text-white/40">•</span>
      </button>
    </li>
  );
});

const SubCategoryItem = memo(function SubCategoryItem({
  subcategory,
  isOpen,
  activeSlug,
  onToggle,
  onChildClick,
}) {
  const childCategories = getChildCategories(subcategory);
  const hasChildren = childCategories.length > 0;

  return (
    <li className="rounded-2xl bg-white/5">
      <button
        type="button"
        onClick={() => hasChildren && onToggle(getItemId(subcategory, subcategory?.name))}
        className={`flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-3 pl-6 text-left transition-all duration-300 ${
          isOpen ? 'bg-white/10 text-white' : 'text-white/85 hover:bg-white/8'
        }`}
        aria-expanded={isOpen}
        aria-disabled={!hasChildren}
      >
        <span className="truncate text-sm font-medium">{subcategory.name}</span>
        {hasChildren ? <ToggleIcon isOpen={isOpen} /> : null}
      </button>

      {isOpen && hasChildren ? (
        <ul className="space-y-1 px-2 pb-2 transition-all duration-300">
          {childCategories.map((child, index) => {
            const childSlug = child?.slug ?? String(getItemId(child, index));

            return (
              <ChildCategoryButton
                key={getItemId(child, `${subcategory?.name}-${index}`)}
                child={child}
                isActive={activeSlug === childSlug}
                onClick={onChildClick}
              />
            );
          })}
        </ul>
      ) : null}
    </li>
  );
});

const CategoryItem = memo(function CategoryItem({
  category,
  isOpen,
  openSubCategoryId,
  activeSlug,
  onToggle,
  onSubToggle,
  onChildClick,
}) {
  const subcategories = getSubcategories(category);
  const hasSubcategories = subcategories.length > 0;

  return (
    <li className=" bg-white/5">
      <button
        type="button"
        onClick={() => hasSubcategories && onToggle(getItemId(category, category?.name))}
        className={`category-item flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-300 ${
          isOpen ? 'bg-white/10 text-white' : 'text-white hover:bg-white/8'
        }`}
        aria-expanded={isOpen}
        aria-disabled={!hasSubcategories}
      >
        <span className="truncate text-sm font-semibold">{category.name}</span>
        {hasSubcategories ? <ToggleIcon isOpen={isOpen} /> : null}
      </button>

      {isOpen && hasSubcategories ? (
        <ul className="space-y-2 px-2 pb-2 transition-all duration-300">
          {subcategories.map((subcategory, index) => (
            <SubCategoryItem
              key={getItemId(subcategory, `${category?.name}-${index}`)}
              subcategory={subcategory}
              isOpen={openSubCategoryId === getItemId(subcategory, `${category?.name}-${index}`)}
              activeSlug={activeSlug}
              onToggle={onSubToggle}
              onChildClick={onChildClick}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
});

export default function MobileCategoryMenu({ categories = [], onNavigate }) {
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubCategory, setOpenSubCategory] = useState(null);
  const [activeSlug, setActiveSlug] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname?.startsWith('/products/')) {
      setActiveSlug(null);
      return;
    }

    setActiveSlug(pathname.split('/products/')[1]?.split('/')[0] || null);
  }, [pathname]);

  const handleCategoryToggle = (categoryId) => {
    setOpenCategory((current) => (current === categoryId ? null : categoryId));
    setOpenSubCategory(null);
  };

  const handleSubCategoryToggle = (subcategoryId) => {
    setOpenSubCategory((current) => (current === subcategoryId ? null : subcategoryId));
  };

  const handleChildClick = (child) => {
    const targetSlug = child?.slug;

    if (!targetSlug) {
      return;
    }

    router.push(`/products/${targetSlug}`);
    onNavigate?.();
  };

  return (
    <div className="space-y-3">

      <ul className="space-y-3">
        {categories.map((category, index) => {
          const categoryId = getItemId(category, index);

          return (
            <CategoryItem
              key={categoryId}
              category={category}
              isOpen={openCategory === categoryId}
              openSubCategoryId={openSubCategory}
              activeSlug={activeSlug}
              onToggle={handleCategoryToggle}
              onSubToggle={handleSubCategoryToggle}
              onChildClick={handleChildClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

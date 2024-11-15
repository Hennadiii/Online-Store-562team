import { useEffect, useRef, useState } from 'react';
import Header from '../components/shared/header';
import Cart from '../components/shared/cart';
import Footer from '../components/shared/footer';

const tabsData = [
  {
    label: 'Корзина',
    content: <Cart />,
  },
  {
    label: 'Checkout details',
    content:
      'Fugiat dolor et quis in incididunt aute. Ullamco voluptate consectetur dolor officia sunt est dolor sint.',
  },
  {
    label: 'Замовлення завершене',
    content: 'zamoblenna',
  },
];

const CartPage = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex] as HTMLElement;
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    window.addEventListener('resize', setTabPosition);

    return () => window.removeEventListener('resize', setTabPosition);
  }, [activeTabIndex]);

  return (
    <>
      <main className="mx-auto h-full max-w-[1440px]">
        <Header />
        <h1 className="mt-[70px] text-center text-[54px] font-bold">Cart</h1>
        <div className="mx-auto w-fit">
          <div className="relative">
            <div className="mt-8 flex gap-x-5 space-x-4">
              {tabsData.map((tab, idx) => {
                const isActive = activeTabIndex === idx;

                return (
                  <div
                    key={idx}
                    ref={(el) => (tabsRef.current[idx] = el)}
                    className="min-w-[256px] cursor-pointer"
                    onClick={() => setActiveTabIndex(idx)}
                  >
                    <div className="flex items-center gap-x-3">
                      <div
                        className={`h-fit w-fit rounded-[50%] ${isActive ? 'bg-main' : 'bg-main/20'} px-[17px] py-2 text-white`}
                      >
                        {idx + 1}
                      </div>
                      <span
                        className={`text-[14px] ${isActive ? '' : 'text-main/20'}`}
                      >
                        {tab.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <span
              className="absolute bottom-0 top-16 block h-1 bg-main transition-all duration-300"
              style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
            />
          </div>
        </div>
        <section className="mt-20 w-full">
          {tabsData[activeTabIndex].content}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CartPage;

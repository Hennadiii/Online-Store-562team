import { useState, useRef, useEffect } from 'react';
import Footer from '../components/shared/footer';
import Header from '../components/shared/header';
import EditProfileForm from '../components/shared/editProfileForm';
import SavedAddressList from '../components/shared/savedAddress-list';

const profileTabs = [
  {
    label: 'Account',
    content: <EditProfileForm />,
  },
  {
    label: 'Address',
    content: <SavedAddressList />,
  },
  {
    label: 'Orders',
    content: 'orders info',
  },
  {
    label: 'Wishlist',
    content: 'wishlist info',
  },
  {
    label: 'Log Out',
    content: '',
  },
];

const ProfilePage: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState<number>(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState<number>(0);

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

        <section className="gap-x- mt-[102px] flex gap-x-[75px] px-[160px]">
          <div className="h-fit w-[262px] rounded-[8px] bg-first px-2 py-4">
            <div className="mt-6 flex flex-col items-center justify-center">
              <div className="h-[82px] w-[82px] rounded-[50%] bg-[#c4c4c4]"></div>
              <span className="mt-2 text-center text-[20px] font-bold">
                Kamila More
              </span>
            </div>
            <ul className="mt-10 flex flex-col gap-y-[13px] font-bold">
              {profileTabs.map((item, index) => {
                const isActive = activeTabIndex === index;

                return (
                  <div className="relative">
                    <li
                      ref={(el) => (tabsRef.current[index] = el)}
                      key={index}
                      onClick={() => setActiveTabIndex(index)}
                      className={`${isActive ? '' : 'cursor-pointer rounded-[8px] transition-colors hover:bg-second'} px-1 py-2`}
                    >
                      {item.label}
                    </li>

                    <hr
                      className={`absolute bottom-[-2px] mt-2 ${isActive ? 'ml-1 w-[230px] transition-all duration-300' : 'w-0'}`}
                    />
                  </div>
                );
              })}
            </ul>
          </div>

          <section className="">{profileTabs[activeTabIndex].content}</section>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;

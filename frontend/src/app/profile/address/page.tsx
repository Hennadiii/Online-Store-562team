import AddressForm from "@/components/profile/addressForm";
import AddresBookList from "@/components/profile/addressList";
import ProfileSidebar from "@/components/profile/sidebar";
import AnimatedSection from "@/components/shared/animatedSection";

const AddressBookPage = () => {
  return (
    <AnimatedSection>
      <div className="flex gap-x-[226px] mt-9">
        <ProfileSidebar />

        <section className="flex gap-11">
          <div>
            <h2 className="text-[24px] leading-[120%] mb-10">Адресна книга</h2>

            <AddresBookList />
          </div>

          <div>
            <h2 className="text-[24px] leading-[120%] mb-10">
              Додати нову адресу
            </h2>

            <AddressForm />
          </div>
        </section>
      </div>
    </AnimatedSection>
  );
};

export default AddressBookPage;

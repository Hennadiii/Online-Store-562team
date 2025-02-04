const AddressForm = () => {
  return (
    <form>
      <div className="h-[62px] flex flex-col gap-y-1 w-[393px]">
        <label className="text-[12px]">Імʼя</label>
        <input
          className="h-[41px] p-2 border-b border-black"
          placeholder="Введіть імʼя отримувача"
        />
      </div>
      <div className="h-[62px] flex flex-col gap-y-1 w-full max-w-[393px]">
        <label className="text-[12px]">Введіть прізвище отримувача</label>
        <input
          className="h-[41px] p-2 border-b border-black"
          placeholder="Прізвище"
        />
      </div>
      <div className="h-[62px] flex flex-col gap-y-1 w-full max-w-[393px]">
        <label className="text-[12px]">Телефон</label>
        <input
          className="h-[41px] p-2 border-b border-black"
          placeholder="+ 380 (__) ___ __ __"
        />
      </div>
      <div className="h-[62px] flex flex-col gap-y-1 w-full max-w-[393px]">
        <label className="text-[12px]">Місто</label>
        <input
          className="h-[41px] p-2 border-b border-black"
          placeholder="Введіть місто отримувача"
        />
      </div>
      <div className="h-[62px] flex flex-col gap-y-1 w-full max-w-[393px]">
        <label className="text-[12px]">Область</label>
        <input
          className="h-[41px] p-2 border-b border-black"
          placeholder="Введіть область отримувача"
        />
      </div>
      <div className="h-[62px] flex flex-col gap-y-1 w-full max-w-[393px]">
        <label className="text-[12px]">Відділення Нової пошти</label>
        <input
          className="h-[41px] p-2 border-b border-black"
          placeholder="Введіть відділення отримувача"
        />
      </div>
    </form>
  );
};

export default AddressForm;

const SavedAddressItem = () => {
  return (
    <div className="flex max-w-[342px] flex-col gap-y-1 rounded-[8px] border-[1px] border-[#6c7275] p-4">
      <div className="flex items-center justify-between gap-x-10">
        <span className="font-bold">Shipping Address</span>
        <div className="flex cursor-pointer items-center gap-x-1 hover:text-second">
          <img src="savedAddress.svg" />
          <span>Edit</span>
        </div>
      </div>
      <span className="mt-2">Sofia Havertz</span>
      <span>(+1) 234 567 890</span>
      <span
        title="345 Long Island, NewYork, United States"
        className="line-clamp-2"
      >
        345 Long Island, NewYork, United States
      </span>
    </div>
  );
};

export default SavedAddressItem;

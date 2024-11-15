import SavedAddressItem from './savedAddress-Item';

const SavedAddressList: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <SavedAddressItem />
      <SavedAddressItem />
      <SavedAddressItem />
      <SavedAddressItem />
    </div>
  );
};

export default SavedAddressList;

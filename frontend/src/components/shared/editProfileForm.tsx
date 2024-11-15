import { Button } from '../ui/button';

const EditProfileForm = () => {
  return (
    <form className="flex max-w-[707px] flex-col gap-y-6">
      <h1 className="text-[20px] font-bold">Account Details</h1>

      <div className="flex w-full flex-col gap-y-2">
        <label className="text-[12px]">FIRST NAME *</label>
        <input
          className="h-10 w-full rounded-[6px] border-[1px] border-[#cbcbcb] px-4"
          placeholder="First name"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label className="text-[12px]">Last NAME *</label>
        <input
          className="h-10 w-full rounded-[6px] border-[1px] border-[#cbcbcb] px-4"
          placeholder="Last name"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label className="text-[12px]">DISPLAY NAME *</label>
        <input
          className="h-10 w-full rounded-[6px] border-[1px] border-[#cbcbcb] px-4"
          placeholder="Display name"
        />
        <span className="text-[12px] text-[#6c7275]">
          This will be how your name will be displayed in the account section
          and in reviews
        </span>
      </div>
      <div className="flex flex-col gap-y-2">
        <label className="text-[12px]">Email *</label>
        <input
          className="h-10 w-full rounded-[6px] border-[1px] border-[#cbcbcb] px-4"
          placeholder="Email"
        />
      </div>

      <h2 className="mt-4 text-[20px] font-bold">Password</h2>

      <div className="flex flex-col gap-y-2">
        <label className="text-[12px]">OLD PASSWORD *</label>
        <input
          className="h-10 w-full rounded-[6px] border-[1px] border-[#cbcbcb] px-4"
          placeholder="Old password"
          type="password"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label className="text-[12px]">NEW PASSWORD *</label>
        <input
          className="h-10 w-full rounded-[6px] border-[1px] border-[#cbcbcb] px-4"
          placeholder="New password"
          type="password"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label className="text-[12px]">REPEAT NEW PASSWORD *</label>
        <input
          className="h-10 w-full rounded-[6px] border-[1px] border-[#cbcbcb] px-4"
          placeholder="Repeat new password"
          type="password"
        />
      </div>

      <Button className="max-w-[180px] text-[16px]">Save changes</Button>
    </form>
  );
};

export default EditProfileForm;

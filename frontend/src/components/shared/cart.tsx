import { Button } from '../ui/button';
import Quantity from './quantity';

const Cart = () => {
  return (
    <div className="flex justify-between gap-x-10 px-[160px] pb-[200px] pt-[25px]">
      <table className="h-fit min-w-[643px]">
        <thead className="border-b text-left text-[14px]">
          <tr>
            <th scope="col" className="w-[48.7%] pb-[27px]">
              Product
            </th>
            <th scope="col" className="w-[75px] pb-[30px]">
              Quantity
            </th>
            <th scope="col" className="w-[75px] pb-[30px] text-center">
              Price
            </th>
            <th scope="col" className="w-[75px] pb-[30px] text-right">
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-main/10">
            <td className="py-[22px]">
              <div>
                <img src="chairCart.png" />
              </div>
            </td>
            <td className="py-[24px]">
              <Quantity second={true} />
            </td>
            <td className="py-[24px] text-center">$19.00</td>
            <td className="py-[24px] text-right">$38.00</td>
          </tr>
          <tr className="border-b border-main/10">
            <td className="py-[22px]">
              <div>
                <img src="chairCart.png" />
              </div>
            </td>
            <td className="py-[24px]">
              <Quantity second={true} />
            </td>
            <td className="py-[24px] text-center">$19.00</td>
            <td className="py-[24px] text-right">$38.00</td>
          </tr>
          <tr className="border-b border-main/10">
            <td className="py-[22px]">
              <div>
                <img src="chairCart.png" />
              </div>
            </td>
            <td className="py-[24px]">
              <Quantity second={true} />
            </td>
            <td className="py-[24px] text-center">$19.00</td>
            <td className="py-[24px] text-right">$38.00</td>
          </tr>
        </tbody>
      </table>

      <div className="h-fit min-w-[413px] rounded-[6px] border-[2px] p-[24px]">
        <h2>Сума</h2>
        <div className="mt-5 flex flex-col gap-y-3">
          <div className="flex items-center justify-between rounded-[4px] border-[1px] px-4 py-[13px]">
            <div className="flex items-center gap-x-3">
              <input type="radio" />
              <label className="text-[14px]">Безкоштовна доставка</label>
            </div>
            <span>$0.00</span>
          </div>
          <div className="flex items-center justify-between rounded-[4px] border-[1px] px-4 py-[13px]">
            <div className="flex items-center gap-x-3">
              <input type="radio" />
              <label className="text-[14px]">Експрес доставка</label>
            </div>
            <span>+$15.00</span>
          </div>
          <div className="flex items-center justify-between rounded-[4px] border-[1px] px-4 py-[13px]">
            <div className="flex items-center gap-x-3">
              <input type="radio" />
              <label className="text-[14px]">Самовивіз</label>
            </div>
            <span>%21.00</span>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between">
          <span>Subtotal</span>
          <span>$1234.00</span>
        </div>

        <hr className="my-[15px] text-second" />

        <div className="flex items-center justify-between font-bold">
          <span>Усього</span>
          <span className="text-[19px]">$1345.00</span>
        </div>

        <Button className="mt-10 h-[52px] text-[16px]">Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;

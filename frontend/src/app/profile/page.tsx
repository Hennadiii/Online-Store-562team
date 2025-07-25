import { navTo } from "@/utils/navigations";
import { redirect } from "next/navigation";

export default function ProfileIndexPage() {
  redirect(navTo.profileOrders); // или любой другой дефолтный раздел
}

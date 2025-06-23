import { navTo } from "@/utils/navigations";
import { redirect } from "next/navigation";

export default function AdminIndexPage() {
  redirect(navTo.adminProducts); // или любой другой дефолтный раздел
}

import AccountsComponent from "@/app/accounts";
import ReservationComponent from "@/app/reservation";
import ConfirmComponent from "@/app/confirm";

export default function Page() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 items-start">
        <div className="flex flex-col gap-2">
          <div className="flex border rounded-lg border-dashed border-gray-200 dark:border-gray-800">
            <AccountsComponent/>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex border rounded-lg border-dashed border-gray-200 dark:border-gray-800">
            <ReservationComponent/>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex border rounded-lg h-[200px] border-dashed border-gray-200 dark:border-gray-800">
            <ConfirmComponent/>
          </div>
        </div>
      </main>
    );
}
import ReservationMenu from "@/components/ReservationMenu";
import styles from './reservation.module.css';

export default function Reservations({children}: {children: React.ReactNode}) {
    return (
        <div>
            {children}
        </div>
    );
}
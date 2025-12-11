export type Slot = {
  id: number;
  doctor_id: number;
  slot_time: string; // ISO timestamp
  is_booked: boolean;
}

export type Doctor = {
  id: number;
  name: string;
}

export type Booking = {
  id: number;
  slot_id: number;
  user_name: string;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
  created_at: string;
}

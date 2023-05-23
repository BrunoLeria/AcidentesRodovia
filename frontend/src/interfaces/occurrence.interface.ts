export interface IOccurrence {
  readonly id: number;
  readonly registered_at: string;
  readonly local: string;
  readonly occurrence_type: number;
  readonly km: number;
  readonly user_id: number;
}

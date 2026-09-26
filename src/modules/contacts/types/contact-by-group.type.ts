export type ContactByGroup = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string | null;
  is_active: boolean;
  observations: string | null;
  groups: {
    id: string;
    name: string;
    contacts_groups_id: string;
  }[];
};

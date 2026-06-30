import { useCallback, useState } from "react";

export type UseHeroContactPanelResult = Readonly<{
  contactOpen: boolean;
  marginActive: boolean;
  onContactCloseComplete: () => void;
  toggleContact: () => void;
}>;

/**
 * État ouvert / fermeture du panneau contact sous les CTA.
 * Les callbacks ont `[]` : ils n'utilisent que des setters React, stables entre les renders.
 */
export function useHeroContactPanel(): UseHeroContactPanelResult {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactClosing, setContactClosing] = useState(false);

  const toggleContact = useCallback(() => {
    setContactOpen((open) => {
      if (open) {
        setContactClosing(true);
        return false;
      }
      setContactClosing(false);
      return true;
    });
  }, []);

  const onContactCloseComplete = useCallback(() => {
    setContactClosing(false);
  }, []);

  return {
    contactOpen,
    marginActive: contactOpen || contactClosing,
    toggleContact,
    onContactCloseComplete,
  };
}

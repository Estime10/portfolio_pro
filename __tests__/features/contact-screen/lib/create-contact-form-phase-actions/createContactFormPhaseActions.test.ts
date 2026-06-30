import { describe, expect, it, vi } from "vitest";
import { createContactFormPhaseActions } from "@/features/contact-screen/lib/create-contact-form-phase-actions/createContactFormPhaseActions";

describe("createContactFormPhaseActions", () => {
  it("opens direct channels for general contact flow", () => {
    const setIntentId = vi.fn();
    const setPhase = vi.fn();
    const resetWizardFields = vi.fn();

    const actions = createContactFormPhaseActions({
      resetWizardFields,
      setIntentId,
      setPhase,
    });

    actions.openDirectChannels("general-contact");

    expect(setIntentId).toHaveBeenCalledWith("general-contact");
    expect(setPhase).toHaveBeenCalledWith("direct-channels");
    expect(resetWizardFields).not.toHaveBeenCalled();
  });

  it("starts wizard and resets fields", () => {
    const setIntentId = vi.fn();
    const setPhase = vi.fn();
    const resetWizardFields = vi.fn();

    const actions = createContactFormPhaseActions({
      resetWizardFields,
      setIntentId,
      setPhase,
    });

    actions.startWizard("marketing-site");

    expect(setIntentId).toHaveBeenCalledWith("marketing-site");
    expect(resetWizardFields).toHaveBeenCalledOnce();
    expect(setPhase).toHaveBeenCalledWith("wizard");
  });

  it("cancels wizard back to intent selection", () => {
    const setIntentId = vi.fn();
    const setPhase = vi.fn();
    const resetWizardFields = vi.fn();

    const actions = createContactFormPhaseActions({
      resetWizardFields,
      setIntentId,
      setPhase,
    });

    actions.cancelWizard();

    expect(resetWizardFields).toHaveBeenCalledOnce();
    expect(setIntentId).toHaveBeenCalledWith(null);
    expect(setPhase).toHaveBeenCalledWith("intent-selection");
  });
});

import { Prop } from "../../utils/prop";

/**
 * Track gauge in millimeters.
 * @example 1435 (standard gauge), 1520 (Russian gauge), 1067 (Cape gauge)
 */
export const trackGaugeMmProp = new Prop<number>("trackGaugeMm");

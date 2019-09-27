-- =============================================================================
-- The following directives assign pins to the locations specific for the
-- CY8CKIT-046 kit.
-- =============================================================================

-- === USBFS ===
attribute port_location of \USBFS:Dp(0)\ : label is "PORT(13,0)";
attribute port_location of \USBFS:Dm(0)\ : label is "PORT(13,1)";

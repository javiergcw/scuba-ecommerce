"use client";

import { IconButton, Zoom } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function FloatingWhatsAppButton() {
    const phoneNumber = "573165341834";
    const message = encodeURIComponent("Hola, ¿me puedes contar más sobre las inmersiones que ofrece Scuba? 🤿🐠");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <Zoom in>
            <IconButton
                sx={{
                    height:60,
                    width:60,
                    position: "fixed",
                    bottom: 24,
                    right: 24,
                    zIndex: 1000,
                    backgroundColor: "#25D366",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                    "&:hover": {
                        backgroundColor: "#1EBE5D",
                    },
                }}
                component="a"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
            >
                <WhatsAppIcon sx={{fontSize:35}}/>
            </IconButton>
        </Zoom>
    );
}

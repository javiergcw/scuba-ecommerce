// components/PrivacyPolicy.tsx
import { Box, Typography, Container, List, ListItem } from '@mui/material';

const PrivacyPolicy = () => {
    return (
        <Container maxWidth="md" sx={{ py: { xs: 15, md: 10 } }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    textAlign: 'center',
                    fontSize: { xs: '1.5rem', md: '2.125rem' },
                }}
            >
                Políticas de Privacidad
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                Última actualización: 8 de mayo de 2025
            </Typography>

            <Typography paragraph>
                En Oceano Scuba, entendemos la importancia de proteger la privacidad de nuestros usuarios y de garantizar el tratamiento adecuado de sus datos personales conforme a la legislación vigente en Colombia, incluyendo la Ley 1581 de 2012, el Decreto 1377 de 2013, y demás normas que regulan la materia.
            </Typography>

            <Typography variant="h6" gutterBottom>1. Responsable del Tratamiento de Datos</Typography>
            <Typography paragraph>
                El responsable del tratamiento de datos personales es Oceano Scuba, identificado como establecimiento de comercio afiliado a PADI en Colombia, con domicilio en Carrera 2 # 17 - 46 Esquina, Taganga, Santa Marta D.T.C.H - Colombia, y con el siguiente correo electrónico de contacto: oceano@oceanoscuba.com.co.
            </Typography>
            <Typography paragraph>
                Como responsable, nos comprometemos a manejar los datos personales de los usuarios con responsabilidad, confidencialidad y en cumplimiento de la normativa aplicable.
            </Typography>

            <Typography variant="h6" gutterBottom>2. Datos Personales que Recopilamos</Typography>
            <Typography paragraph>
                A través de nuestro sitio web, formularios de contacto, procesos de reserva, suscripciones y comunicaciones electrónicas, recopilamos los siguientes tipos de datos personales:
            </Typography>
            <List>
                <ListItem>Nombre completo</ListItem>
                <ListItem>Número de teléfono fijo o móvil</ListItem>
                <ListItem>Dirección de correo electrónico</ListItem>
                <ListItem>Información médica sensible</ListItem>
                <ListItem>Nacionalidad y edad (cuando aplique)</ListItem>
                <ListItem>Datos de facturación y pago (a través de terceros)</ListItem>
                <ListItem>Historial de reservas y cursos</ListItem>
                <ListItem>Dirección IP, navegador y comportamiento (cookies)</ListItem>
            </List>
            <Typography paragraph>
                Nota: En ningún caso solicitamos ni almacenamos datos financieros directamente como números de tarjeta. Estos son gestionados por terceros certificados.
            </Typography>

            <Typography variant="h6" gutterBottom>3. Finalidades del Tratamiento</Typography>
            <Typography paragraph>Los datos personales serán utilizados exclusivamente para:</Typography>
            <List>
                <ListItem>Gestionar servicios de buceo y reservas.</ListItem>
                <ListItem>Enviar notificaciones relacionadas con actividades programadas.</ListItem>
                <ListItem>Elaborar certificados exigidos por entidades como PADI.</ListItem>
                <ListItem>Cumplir normativas de seguridad y autoridades competentes.</ListItem>
                <ListItem>Ofrecer soporte técnico y asistencia personalizada.</ListItem>
                <ListItem>Realizar encuestas de satisfacción.</ListItem>
                <ListItem>Enviar promociones (previo consentimiento).</ListItem>
            </List>

            <Typography variant="h6" gutterBottom>4. Derechos del Titular de los Datos</Typography>
            <Typography paragraph>
                Los titulares tienen derecho a conocer, actualizar, rectificar, suprimir sus datos y revocar la autorización, salvo que exista un deber legal o contractual. Las solicitudes deben enviarse a oceano@oceanoscuba.com.co y serán atendidas en un plazo máximo de 15 días hábiles.
            </Typography>

            <Typography variant="h6" gutterBottom>5. Seguridad de la Información</Typography>
            <Typography paragraph>
                Implementamos medidas técnicas, administrativas y organizativas para proteger los datos personales:
            </Typography>
            <List>
                <ListItem>Protocolos de acceso restringido</ListItem>
                <ListItem>Encriptación de información confidencial</ListItem>
                <ListItem>Control de acceso lógico y físico</ListItem>
                <ListItem>Copias de seguridad periódicas</ListItem>
                <ListItem>Capacitación en buenas prácticas</ListItem>
            </List>

            <Typography variant="h6" gutterBottom>6. Almacenamiento y Conservación</Typography>
            <Typography paragraph>
                Los datos se almacenan en servidores seguros y se conservarán mientras exista una finalidad legal o contractual. Luego serán eliminados o anonimizados conforme a la ley.
            </Typography>

            <Typography variant="h6" gutterBottom>7. Transferencia y Cesión de Datos</Typography>
            <Typography paragraph>
                Oceano Scuba no vende ni comparte datos con fines comerciales. Solo se comparte con:
            </Typography>
            <List>
                <ListItem>Proveedores tecnológicos o de pago</ListItem>
                <ListItem>Entidades reguladoras como PADI</ListItem>
                <ListItem>Autoridades competentes mediante orden legal</ListItem>
            </List>

            <Typography variant="h6" gutterBottom>8. Uso de Cookies</Typography>
            <Typography paragraph>
                Utilizamos cookies para mejorar la experiencia de navegación. Los usuarios pueden aceptarlas o rechazarlas desde su navegador.
            </Typography>

            <Typography variant="h6" gutterBottom>9. Modificaciones a esta Política</Typography>
            <Typography paragraph>
                Oceano Scuba se reserva el derecho de modificar esta política en cualquier momento. Las modificaciones se comunicarán en este sitio web.
            </Typography>
        </Container>
    );
};

export default PrivacyPolicy;

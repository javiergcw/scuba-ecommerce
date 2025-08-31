// components/TermsAndConditions.tsx
import { Box, Container, List, ListItem, Typography } from '@mui/material';

const TermsAndConditions = () => {
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
                Términos y Condiciones de Uso del Sitio Web
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                Última actualización: 8 de mayo de 2025
            </Typography>

            <Typography paragraph>
                Le damos la bienvenida a https://oceanoscuba.com.co, sitio web oficial de Oceano Scuba, centro de formación en buceo y operador turístico afiliado a PADI®. Al ingresar, navegar o utilizar nuestros servicios digitales, usted acepta regirse por los siguientes Términos y Condiciones, los cuales son de obligatorio cumplimiento y regulan la relación entre Oceano Scuba y los usuarios de la plataforma.
            </Typography>

            <Typography variant="h6" gutterBottom>1. Aceptación de los Términos</Typography>
            <Typography paragraph>
                El acceso a este sitio web implica la aceptación plena y sin reservas de los presentes términos. En caso de no estar de acuerdo con su contenido, el usuario deberá abstenerse de utilizar este sitio web o los servicios que en él se ofrecen.
            </Typography>
            <Typography paragraph>
                Estos términos constituyen un acuerdo legal vinculante entre el usuario y Oceano Scuba. Cualquier uso indebido, fraudulento o contrario a la ley podrá derivar en la cancelación del acceso al sitio o a los servicios contratados, sin perjuicio de las acciones legales correspondientes.
            </Typography>

            <Typography variant="h6" gutterBottom>2. Servicios Ofrecidos</Typography>
            <Typography paragraph>
                A través del sitio web de Oceano Scuba se ofrece información, reservas y venta de servicios relacionados con:
            </Typography>
            <List>
                <ListItem>Cursos de buceo certificados por PADI®</ListItem>
                <ListItem>Salidas guiadas de buceo recreativo en el Caribe colombiano</ListItem>
                <ListItem>Alquiler de equipos de buceo</ListItem>
                <ListItem>Fotografía subacuática</ListItem>
                <ListItem>Actividades complementarias como snorkel, transporte marítimo, y paquetes turísticos</ListItem>
            </List>
            <Typography paragraph>
                Toda la información sobre los servicios, duración, precios, requisitos y condiciones específicas se encuentra publicada en sus respectivas secciones. Oceano Scuba se reserva el derecho de modificar el contenido o disponibilidad de los servicios sin previo aviso.
            </Typography>

            <Typography variant="h6" gutterBottom>3. Reservas y Pagos</Typography>
            <Typography paragraph>Las reservas podrán realizarse mediante los formularios del sitio web o por contacto directo.</Typography>
            <Typography paragraph>
                <strong>Condiciones de pago:</strong>
            </Typography>
            <List>
                <ListItem>Pago mediante tarjetas, transferencias o plataformas certificadas.</ListItem>
                <ListItem>La reserva se confirma solo con el pago total o parcial.</ListItem>
                <ListItem>Falta de pago puede liberar el cupo sin aviso.</ListItem>
            </List>
            <Typography paragraph>
                <strong>Cancelaciones y reembolsos:</strong>
            </Typography>
            <List>
                <ListItem>Cancelaciones con +72h pueden tener reembolso parcial o total.</ListItem>
                <ListItem>Cancelaciones con -72h no son reembolsables salvo fuerza mayor.</ListItem>
                <ListItem>No presentarse implica pérdida del valor pagado.</ListItem>
            </List>

            <Typography variant="h6" gutterBottom>4. Requisitos para Participar</Typography>
            <List>
                <ListItem>Edad mínima: 10 años (PADI Discover Scuba Diving)</ListItem>
                <ListItem>Condición física apta, certificada si se requiere</ListItem>
                <ListItem>Firma de exenciones y formularios médicos</ListItem>
                <ListItem>Seguir instrucciones del personal autorizado</ListItem>
                <ListItem>En niveles avanzados: certificación previa o experiencia</ListItem>
            </List>
            <Typography paragraph>
                El incumplimiento de los requisitos podrá cancelar la participación sin derecho a reembolso.
            </Typography>

            <Typography variant="h6" gutterBottom>5. Propiedad Intelectual</Typography>
            <Typography paragraph>
                Todo el contenido del sitio (textos, imágenes, software, etc.) es propiedad de Oceano Scuba o de terceros autorizados. Queda prohibido su uso sin autorización expresa y escrita. El uso indebido puede derivar en acciones legales.
            </Typography>

            <Typography variant="h6" gutterBottom>6. Limitación de Responsabilidad</Typography>
            <Typography paragraph>
                Oceano Scuba no se responsabiliza por:
            </Typography>
            <List>
                <ListItem>Daños derivados del mal uso del sitio web</ListItem>
                <ListItem>Errores en la información o fallos del sistema</ListItem>
                <ListItem>Riesgos inherentes a actividades acuáticas</ListItem>
                <ListItem>Accidentes o pérdidas por negligencia del participante o clima adverso</ListItem>
            </List>

            <Typography variant="h6" gutterBottom>7. Política de Privacidad</Typography>
            <Typography paragraph>
                El uso del sitio también está regido por la Política de Privacidad. Al aceptar estos Términos, el usuario acepta dicha política.
            </Typography>

            <Typography variant="h6" gutterBottom>8. Modificaciones</Typography>
            <Typography paragraph>
                Oceano Scuba podrá modificar estos Términos en cualquier momento. Los cambios se publicarán y tendrán efecto inmediato. El uso continuo del sitio implica su aceptación.
            </Typography>

            <Typography variant="h6" gutterBottom>9. Ley Aplicable y Jurisdicción</Typography>
            <Typography paragraph>
                Estos Términos se rigen por las leyes de Colombia. Cualquier disputa se resolverá ante tribunales de Santa Marta, D.T.C.H., renunciando a cualquier otro fuero.
            </Typography>
        </Container>
    );
};

export default TermsAndConditions;

import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';

const authMiddleware = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    // Ajoutez ici la logique de vérification de l'authentification et des autorisations
    // Vous pouvez vérifier les cookies, les jetons JWT ou utiliser une stratégie d'authentification personnalisée
    if (!process.env.NEXT_PUBLIC_SECRET) {
        return res.status(500).json({ message: 'Issue with the app configuration, contact the support.' });
    }

    const authHeader = req.headers.authorization;
    let token: string | null | jwt.JwtPayload = null;
    console.log(authHeader);
    if (authHeader) {
        const authHeaderParts = authHeader.split(' ');
        if (authHeaderParts[0].toLowerCase() === 'bearer' && authHeaderParts[1]) {
            token = authHeaderParts[1];
        }
    }

    if (token) {
        try {
            token = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET);
        } catch (error) {
            console.log('error', error);
        }
    }

    console.log(token);

    // const isAuthenticated;
    // const hasAccess;

    // if (!isAuthenticated || !hasAccess) {
    //     // Si l'utilisateur n'est pas authentifié ou n'a pas les droits d'accès nécessaires, retournez une erreur
    //     return res.status(401).json({ message: 'Non autorisé' });
    // }

    // // Si tout est en ordre, appelez le gestionnaire de route suivant avec `req` et `res`
    return handler(req, res);
};

export default authMiddleware;

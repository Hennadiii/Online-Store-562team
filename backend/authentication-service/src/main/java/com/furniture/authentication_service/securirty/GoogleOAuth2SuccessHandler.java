package com.furniture.authentication_service.securirty;

import com.furniture.authentication_service.model.Person;
import com.furniture.authentication_service.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import com.furniture.authentication_service.dto.TokenResponse;

import java.io.IOException;



@Component
public class GoogleOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final AuthService authService;

    public GoogleOAuth2SuccessHandler(AuthService authService) {
        this.authService = authService;
    }

    @Override
public void onAuthenticationSuccess(HttpServletRequest request,
                                    HttpServletResponse response,
                                    Authentication authentication) throws IOException {
    OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

    String email = oAuth2User.getAttribute("email");
    String firstName = oAuth2User.getAttribute("given_name");
    String lastName = oAuth2User.getAttribute("family_name");

    TokenResponse tokens = authService.loginOrRegisterOAuthUser(email, firstName, lastName);

    String frontendUrl = System.getenv().getOrDefault("FRONTEND_URL", "http://localhost:3000");
    System.out.println(">>> FRONTEND_URL = " + frontendUrl); // временный лог
    getRedirectStrategy().sendRedirect(request, response,
        frontendUrl + "/auth/success?accessToken=" + tokens.getAccessToken()
                    + "&refreshToken=" + tokens.getRefreshToken());
                    
}
}

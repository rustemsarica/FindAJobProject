package com.rustemsarica.FindAJobProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class FindAJobProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(FindAJobProjectApplication.class, args);
	}

}

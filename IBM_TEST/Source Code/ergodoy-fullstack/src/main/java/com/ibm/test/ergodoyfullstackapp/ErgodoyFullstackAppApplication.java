package com.ibm.test.ergodoyfullstackapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = { "com.ibm.test.Controller", "com.ibm.test.Service" , "com.ibm.test.Configuration"})
@EnableJpaRepositories(basePackages = { "com.ibm.test.Repository" })
@EntityScan(basePackages = { "com.ibm.test.Model" })
public class ErgodoyFullstackAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(ErgodoyFullstackAppApplication.class, args);
	}

}


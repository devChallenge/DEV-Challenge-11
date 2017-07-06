package com.dev.challenge.config;

import com.mongodb.MongoClientURI;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.data.mongodb.core.WriteConcernResolver;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.net.UnknownHostException;

import static com.mongodb.WriteConcern.SAFE;

@Configuration
@EnableMongoRepositories(
        basePackages = "com.dev.challenge.repository",
        mongoTemplateRef = "myMongoTemplate"
)
public class MyMongoConfig {

    @Value("${mongo.db.uri}")
    private String uri;

    @Bean
    @Primary
    public MongoDbFactory myMongoDbFactory() throws UnknownHostException {
        MongoClientURI mongoClientURI = new MongoClientURI(uri);
        return new SimpleMongoDbFactory(mongoClientURI);
    }

    @Bean
    @Primary
    public MongoTemplate myMongoTemplate() throws Exception {
        MongoTemplate mongoCashalotTemplate = new MongoTemplate(myMongoDbFactory());
        return mongoCashalotTemplate;
    }

    /**
     * Bean which sets MongoDB in safety mod with multithreading.
     */
    @Bean
    public WriteConcernResolver writeConcernResolver() {
        return action -> SAFE;
    }
}

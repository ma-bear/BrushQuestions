package com.xq.mianshiya.config;

import lombok.Data;
import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author xq
 * @create 2024/9/16 21:49
 */
@Configuration
@ConfigurationProperties(prefix = "spring.redis")
@Data
public class RedissonConfig {
    private String host;
    private Integer port;
    private String password;
    private Integer database;
    private int timeout;

    @Bean
    public RedissonClient getRedissonClient() {
        Config config = new Config();
        config.useSingleServer()
                .setAddress("redis://" + host + ":" + port)
                .setPassword(password)
                .setDatabase(database)
                .setTimeout(timeout);
        return Redisson.create(config);
    }
}

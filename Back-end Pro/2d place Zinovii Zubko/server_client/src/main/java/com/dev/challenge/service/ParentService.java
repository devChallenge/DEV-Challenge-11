package com.dev.challenge.service;

import com.dev.challenge.util.Generator;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class ParentService {

    @Autowired protected Generator generator;
}

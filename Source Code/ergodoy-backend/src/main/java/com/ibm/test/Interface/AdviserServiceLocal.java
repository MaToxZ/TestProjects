package com.ibm.test.Interface;

import java.util.List;

import com.ibm.test.Model.Adviser;


public interface AdviserServiceLocal {

	boolean createAndUpdate(Adviser adviser);

	boolean delete(long adviserId);

	List<Adviser> findAll();

	Adviser find(long adviserId);

}

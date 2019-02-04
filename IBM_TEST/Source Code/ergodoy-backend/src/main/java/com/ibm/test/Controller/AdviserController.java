package com.ibm.test.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ibm.test.Interface.AdviserServiceLocal;
import com.ibm.test.Model.Adviser;

@Controller
@RequestMapping("/adviser")
public class AdviserController {

	@Autowired
	AdviserServiceLocal adviserServiceLocal;
	
	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody Adviser adviser) {
		if(adviser != null) {
			if(adviserServiceLocal.createAndUpdate(adviser)) {
				return ResponseEntity.ok(true);
			}else {
				return ResponseEntity.badRequest().build();
			}
		}else {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@PutMapping("/edit")
	public ResponseEntity<?> edit(@RequestBody Adviser adviser){
		if(adviser != null) {
			if(adviserServiceLocal.createAndUpdate(adviser)) {
				return ResponseEntity.ok(true);
			}else {
				return ResponseEntity.badRequest().build();
			}
		}else {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> delete(@PathVariable("id") long adviserId){
		if(adviserServiceLocal.delete(adviserId)) {
			return ResponseEntity.ok(true);
		}else {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@GetMapping("/findAll")
	public ResponseEntity<List<Adviser>> findAll(){
		List<Adviser> advisers = adviserServiceLocal.findAll();
		if(advisers != null) {
			return ResponseEntity.ok(advisers);
		}else {
			return ResponseEntity.noContent().build();
		}
	}
	
	@GetMapping("/find/{id}")
	public ResponseEntity<Adviser> find(@PathVariable("id") long adviserId){
		Adviser adviser = adviserServiceLocal.find(adviserId);
		if(adviser != null) {
			return ResponseEntity.ok(adviser);
		}else {
			return ResponseEntity.noContent().build();
		}
	}
}

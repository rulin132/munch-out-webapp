import React, {Component} from "react";

class RecipeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteModal: false,
            categories: [],
            author: null,
          };
    }

    componentWillMount(){
     
        //const recipe = this.props.recipe;
       // const recipeCategories = recipe.categories;
        let categoriesRef = firebase.database().ref('categories');
        categoriesRef.once('value', (snapshot) => {
           // const dbCategories = snapshot.val();

            let allCategories = [];
     
            //  Object.keys(dbCategories).forEach((element) => {
            //      if (recipeCategories.indexOf(element)) {
            //     allCategories.push({
            //         value: element,
            //         label: dbCategories[element].text
            //     });
            // }
       
            // });

            // tmp
            allCategories = 
                {
                    'beef': 'Beef',
                    'stew': 'Stew'
            }

            
            this.setState({
                categories: allCategories
            })

            
        });
    }
    toggleDelete() {
        this.setState({
            showDeleteModal: !this.state.showDeleteModal
        });
    }

    getAuthorName() {
        if (this.state.author) {
            console.log(this.state.author);
            return this.state.author.name;
        }

        return '';
    }
    render() {
        let recipeId = this.props.id;
        const recipe = this.props.recipe;
        const recipeName = recipe.recipeName;
        
        let times = {
            prep: {
                hours: 1,
                minutes: 20
            },
            cooking:  {
                hours: 2,
                minutes: 29
            },
        };
        const categories = this.state.categories;

        const author = this.getAuthorName();
        


        return (
 
            <div></div>
               
        );
    }
}

export default RecipeView;

import React, { useRef, Component } from 'react';
import { Search , Mobile } from 'sketch-icons';
import axios from 'axios';
import copy from "clipboard-copy";
import { 
  InputGroup,
  Text,
  Box,
  InputLeftElement,
  Flex,
  Kbd,
  InputRightElement,
  Spacer, 
  CloseButton,
  Alert,
  AlertIcon,
  AlertTitle, 
  Progress,
  Input,
  Container, 
} from '@chakra-ui/react';

/**
 *  search input
 */
// const searchInput = useRef<HTMLInputElement>(null);

class Summarizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      summary: '',
      isLoading: false,
      visible: false,
      copyAlert : false ,  
      mobile : ""
    };
  }

  /**
   *  toast message for copy
   */
  //   const toast = useToast();

  /**
   *  function to copy value to clipboard
   */
  copyIcon = (e) => {  
    console.log("copy");
    copy(`${this.state.summary}`);
    this.setState({
        copyAlert : true
    })
  };


  twilioSubmit = async (e) => {
    e.preventDefault();
    console.log("twilio submit");   
  console.log(this.state.url);
  await axios({
    method: 'post',
    url: 'http://0.0.0.0:8000/twilio?url=' + this.state.summary + "&mobile=" + this.state.mobile,
    headers: {
      'Content-Type': 'application/json',
    },
  }) 
  .then(res => {
    console.log(res);
    this.setState({
      copyAlert : true
  })
  })
  .catch(error => {
    console.log(error); 
  });

  }

  
  urlSubmit = async e => {
    e.preventDefault();
    this.setState({ 
        visible: false,
        isLoading: true, 
        summary: '' });
    console.log(this.state.url);
    await axios({
      method: 'post',
      url: 'http://0.0.0.0:8000/predict?url=' + this.state.url,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        console.log(res);
        this.setState({
          isLoading: false,
          visible: true,
          summary: res.data['summarized_text'],
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const searchInput = useRef < HTMLInputElement > null;

    /**
     *  specifying keyboard shortcut for search input focus
     */
    document.addEventListener('keydown', e => {
      if (e.key.toLowerCase() === 'b' && e.ctrlKey) {
        console.log('ctrl+b');
        searchInput.current && searchInput.current.focus();
      }
    });

    return (
      <Container maxW="container.xl" mt="10">
        <form onSubmit={this.urlSubmit}>
          <Flex>
            <InputGroup shadow="xs" size="lg" my="10">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children={<Search width={15} height={15} color="#718096" />}
              />
              <Input
                name="url"
                id="url"
                onChange={e => this.setState({ url: e.target.value })}
                onFocus={this.handleFocus}
                ref={this.searchInput}
                placeholder="Enter video url"
              />
              <InputRightElement width="10.5rem">
                <span>
                  <Kbd>Enter</Kbd> 
                </span>
              </InputRightElement>
            </InputGroup>
            <Spacer />
 
          </Flex>
        </form>
        <Spacer />

{this.state.copyAlert ? (
    <Alert status='success'>
    <AlertIcon />
    <Box>
      <AlertTitle>Sent!</AlertTitle> 
    </Box>
    <Spacer />
    <CloseButton
      alignSelf='flex-start'
      position='relative'
      right={-1}
      top={-1}
      onClick={() => this.setState({ copyAlert : false })}
    />
  </Alert>
  
) : (
    <></>
) 
}
        {this.state.isLoading ? (
              <Progress size="xs" isIndeterminate />
            ) : ( 
              <></>
            )}

        {this.state.visible ? (
          <Box shadow="xs" w="100%" borderWidth="1px" borderRadius="md">
            
            <Box w="90%" mx={10} my={5}>
              <Text fontSize="lg">{this.state.summary}</Text>
              <Spacer />
              <br />
              <Text fontSize="lg" fontWeight="bolder">Want to save your Text ?</Text>
              <Spacer />
              <form onSubmit={this.twilioSubmit}>
          <Flex>
            <InputGroup shadow="xs" size="md" my="10">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children={<Mobile width={15} height={15} color="#718096" />}
              />
              <Input
                name="mobile"
                type="number"
                id="mobile"
                onChange={e => this.setState({ mobile: e.target.value })}
                onFocus={this.handleFocus}
                placeholder="Enter mobile number"
              />
              <InputRightElement width="10.5rem">
                <span>
                  <Kbd>Enter</Kbd> 
                </span>
              </InputRightElement>
            </InputGroup>
            <Spacer />
 
          </Flex>
        </form>  
            </Box>
          </Box>
        ) : (
          <></>
        )}
      </Container>
    );
  }
}

export default Summarizer;


